

const EntryPattern = /^D([0-7]+)T([0-9SR\-\+]+)([A0-9+]+)$/

const SunTimePattern = /^([0-9]{4})?(S[SR])([0-9]{4})?$/
const FixedTimePattern = /^([0-9]{2})([0-9]{2})$/

export function ImportEntity(hassData, configData, sunData) {
    var output = {};

    // for now only consider 1 action
    var action = hassData.attributes["actions"][0];
    var entity = action['entity'];
    var service = action['service'];
    if (!entity) return; //for now, only allow schedules with entity

    if (entity.indexOf('.') == -1) {
        entity = `${service.split('.').shift()}.${entity}`;
        service = service.split('.').pop();
    }

    entity = configData.Entities(entity);
    if (!entity) return false;

    var service_args = Object.entries(action).filter(([key, val]) => { return !Array('service', 'entity').includes(key) });
    var my_action = {
        service: service
    };
    if (service_args.length) Object.assign(my_action, { service_data: Object.fromEntries(service_args) });

    action = entity.GetActions(my_action);

    if (!action) return false;

    Object.assign(output, {
        entity: entity,
        action: action,
    })

    var entry = hassData.attributes["entries"][0];
    var res = EntryPattern.exec(entry);

    var time_str = res[2];
    var is_fixed_time = FixedTimePattern.exec(time_str);
    var is_sun_time = SunTimePattern.exec(time_str);

    if (is_sun_time !== null) {
        if (is_sun_time[2] == "SR") var timestamp_reference = Number(sunData.sunrise.split(':').shift()) + Number(sunData.sunrise.split(':').pop()) / 60;
        else var timestamp_reference = Number(sunData.sunset.split(':').shift()) + Number(sunData.sunset.split(':').pop()) / 60;

        if (is_sun_time[1]) { //negative offset
            var offset_str = FixedTimePattern.exec(is_sun_time[1]);
            var timestamp_offset = Number(offset_str[1]) + Number(offset_str[2]) / 60;
            var timestamp = timestamp_reference - timestamp_offset;
            var sign = '-';
        }
        else {
            var offset_str = FixedTimePattern.exec(is_sun_time[3]);
            var timestamp_offset = Number(offset_str[1]) + Number(offset_str[2]) / 60;
            var timestamp = timestamp_reference + timestamp_offset;
            var sign = '+';
        }
        var time_hours = Math.floor(timestamp);
        var time_mins = Math.round((timestamp - time_hours) * 6) * 10;

        Object.assign(output, {
            timeHours: String(time_hours).padStart(2, '0'),
            timeMinutes: String(time_mins).padStart(2, '0'),
            timeRaw: `${is_sun_time[2] == "SR" ? 'sunrise' : 'sunset'}${sign}${offset_str[1]}:${offset_str[2]}`,
            sun: true
        })
    }
    else if (is_fixed_time !== null) {
        Object.assign(output, {
            timeHours: is_fixed_time[1],
            timeMinutes: is_fixed_time[2],
        })
    }
    else return;

    var days = res[1].split("");
    days = days.map(Number);
    if (!days[0]) days.splice(0, 1);

    Object.assign(output, {
        days: days,
        daysType: (!days.length ? 'daily' : (isWeekdays(days) ? 'weekdays' : 'custom'))
    });

    return output;
}


export function ExportEntity(userData, sunData) {
    var data = {
        actions: [],
        entries: []
    }

    var action = {
        entity: userData.entity.id,
        service: userData.action.service,
    };

    if (Object.keys(userData.action.service_data).length) Object.assign(action, { service_data: userData.action.service_data });
    data.actions.push(action);

    var entry = {
        actions: [0]    //fow now, always one action per entry
    }

    if (userData.daysType == 'weekdays') Object.assign(entry, { days: [1, 2, 3, 4, 5] });
    else if (userData.daysType == 'custom') Object.assign(entry, { days: userData.days.sort() });

    if (userData.sun && sunData) {
        var timestamp = Number(userData.timeHours) + Number(userData.timeMinutes) / 60;
        var timestamp_sunrise = Number(sunData.sunrise.split(':').shift()) + Number(sunData.sunrise.split(':').pop()) / 60;
        var timestamp_sunset = Number(sunData.sunset.split(':').shift()) + Number(sunData.sunset.split(':').pop()) / 60;

        if (Math.abs(timestamp - timestamp_sunrise) < Math.abs(timestamp - timestamp_sunset)) {
            var sun_string = 'sunrise';
            var timestamp_offset = timestamp - timestamp_sunrise;
        } else {
            var sun_string = 'sunset';
            var timestamp_offset = timestamp - timestamp_sunset;
        }
        var offset_hours = (timestamp_offset > 0) ? Math.abs(Math.floor(timestamp_offset)) : Math.abs(Math.ceil(timestamp_offset));
        var offset_mins = (timestamp_offset > 0) ? Math.round((timestamp_offset - offset_hours) * 60) : -Math.round((timestamp_offset + offset_hours) * 60);
        var offset_string = `${timestamp_offset > 0 ? '' : '-'}${String(offset_hours).padStart(2, '0')}:${String(offset_mins).padStart(2, '0')}`;

        Object.assign(entry, {
            event: sun_string,
            offset: offset_string
        })
    }
    else {
        Object.assign(entry, {
            time: `${userData.timeHours}:${userData.timeMinutes}`
        })
    }

    data.entries.push(entry);

    return data;
}

export function isWeekdays(input) {
    return (
        input.length == 5
        && input.includes(1)
        && input.includes(2)
        && input.includes(3)
        && input.includes(4)
        && input.includes(5)
    );
}



export function parseWeekdays(dayArray) {
    if (!dayArray || !dayArray.length) return 'every day';
    else if (dayArray.length == 5 && !dayArray.includes(6) && !dayArray.includes(7)) return 'on weekdays';
    else {
        var output = [];
        if (dayArray.includes(1)) output.push('monday');
        if (dayArray.includes(2)) output.push('tuesday');
        if (dayArray.includes(3)) output.push('wednesday');
        if (dayArray.includes(4)) output.push('thursday');
        if (dayArray.includes(5)) output.push('friday');
        if (dayArray.includes(6)) output.push('saturday');
        if (dayArray.includes(7)) output.push('sunday');
        output = output.join(', ');
        var n = output.lastIndexOf(', ');
        if (n) output = output.slice(0, n) + output.slice(n).replace(', ', ' and ');
        return `every ${output}`;

    }
}


export function parseTime(timeString, timeStringSun) {
    if (!timeStringSun) {
        return `at ${timeString}`;
    }

    if (timeStringSun.indexOf('+') != -1) {
        var parts = timeStringSun.split('+');
        var offset = Number(parts[1].split(':').shift()) + Number(parts[1].split(':').pop()) / 60;
        if (Math.abs(offset) < 1 / 6) return `at ${parts[0]} (${timeString})`;
        return `${parts[1]} after ${parts[0]} (${timeString})`;
    }
    else {
        var parts = timeStringSun.split('-');
        var offset = Number(parts[1].split(':').shift()) + Number(parts[1].split(':').pop()) / 60;
        if (Math.abs(offset) < 1 / 6) return `at ${parts[0]} (${timeString})`;
        return `${parts[1]} before ${parts[0]} (${timeString})`;
    }
}
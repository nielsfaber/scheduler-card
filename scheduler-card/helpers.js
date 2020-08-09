



export function ImportEntity(hassData, configData, sunData) {
    var entity = configData.Entities(hassData.attributes['entity']);
    if (!entity) return false;

    var action = entity.GetActions({
        service: hassData.attributes['service'],
        service_data: hassData.attributes['service_data']
    });
    if (!action) return false;

    var output = {
        entity: entity,
        action: action,
        timeHours: String(hassData.attributes['time'].split(':').shift()),
        timeMinutes: String(hassData.attributes['time'].split(':').pop()),
        days: JSON.parse(hassData.attributes['days']),
        daysType: null,
    };

    if (!output.days.length) output.daysType = 'daily';
    else if (isWeekdays(output.days)) output.daysType = 'weekdays';
    else output.daysType = 'custom';

    if (hassData.attributes['time'].indexOf('sunrise') > -1 || hassData.attributes['time'].indexOf('sunset') > -1) {
        var time = hassData.attributes['time'];
        if (time.indexOf('sunrise') > -1) {
            var sign = time.substring(7, 8);
            var offset_string = time.substring(8);
            var timestamp_reference = Number(sunData.sunrise.split(':').shift()) + Number(sunData.sunrise.split(':').pop()) / 60;
        } else {
            var sign = time.substring(6, 7);
            var offset_string = time.substring(7);
            var timestamp_reference = Number(sunData.sunset.split(':').shift()) + Number(sunData.sunset.split(':').pop()) / 60;
        }

        var timestamp_offset = Number(offset_string.split(':').shift()) + Number(offset_string.split(':').pop()) / 60;
        var timestamp = (sign == '+') ? (timestamp_reference + timestamp_offset) : (timestamp_reference - timestamp_offset);
        var time_hours = Math.floor(timestamp);
        var time_mins = Math.round((timestamp - time_hours) * 6) * 10;

        output.timeRaw = time;
        output.timeHours = String(time_hours);
        output.timeMinutes = String(time_mins);

    }
    if (output.timeHours.length < 2) output.timeHours = `0${output.timeHours}`;
    if (output.timeMinutes.length < 2) output.timeMinutes = `0${output.timeMinutes}`;

    return output;
}


export function ExportEntity(userData, sunData) {
    var data = {
        time: `${userData.timeHours}:${userData.timeMinutes}`,
        entity: userData.entity.id,
        service: userData.action.service,
    };

    if (userData.sun && sunData) {
        var timestamp = Number(data.time.split(':').shift()) + Number(data.time.split(':').pop()) / 60;
        var timestamp_sunrise = Number(sunData.sunrise.split(':').shift()) + Number(sunData.sunrise.split(':').pop()) / 60;
        var timestamp_sunset = Number(sunData.sunset.split(':').shift()) + Number(sunData.sunset.split(':').pop()) / 60;

        if (Math.abs(timestamp - timestamp_sunrise) < Math.abs(timestamp - timestamp_sunset)) {
            var sun_reference = 'sunrise';
            var timestamp_offset = timestamp - timestamp_sunrise;
        } else {
            var sun_reference = 'sunset';
            var timestamp_offset = timestamp - timestamp_sunset;
        }
        var offset_hours = (timestamp_offset > 0) ? Math.abs(Math.floor(timestamp_offset)) : Math.abs(Math.ceil(timestamp_offset));
        var offset_mins = (timestamp_offset > 0) ? Math.round((timestamp_offset - offset_hours) * 60) : -Math.round((timestamp_offset + offset_hours) * 60);
        if (offset_hours < 10) offset_hours = `0${offset_hours}`;
        if (offset_mins < 10) offset_mins = `0${offset_mins}`;
        var offset = `${offset_hours}:${offset_mins}`;
        data.time = `${sun_reference}${timestamp_offset > 0 ? '+' : '-'}${offset}`;
    }

    if (userData.daysType == 'daily') data.days = [];
    else if (userData.daysType == 'weekdays') data.days = [1, 2, 3, 4, 5];
    else data.days = userData.days.sort();

    if (Object.keys(userData.action.service_data).length) data.service_data = userData.action.service_data;

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
    else {
        var output = [];
        if (dayArray.includes(1)) output.push('monday');
        if (dayArray.includes(2)) output.push('tuesday');
        if (dayArray.includes(3)) output.push('wednesday');
        if (dayArray.includes(4)) output.push('thursday');
        if (dayArray.includes(5)) output.push('friday');
        if (dayArray.includes(6)) output.push('saturday');
        if (dayArray.includes(0)) output.push('sunday');
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
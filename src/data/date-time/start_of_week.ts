


function weekStart(region, language) {
  const regionSat = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g)!;
  const regionSun = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g)!;
  const languageSat = ['ar', 'arq', 'arz', 'fa'];
  const languageSun = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g)!;

  return (
    region ? (
      regionSun.includes(region) ? 'sun' :
        regionSat.includes(region) ? 'sat' : 'mon') : (
        languageSun.includes(language) ? 'sun' :
          languageSat.includes(language) ? 'sat' : 'mon'));
}

export function startOfWeek(locale) {
  const parts = locale.match(/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i);
  return weekStart(parts[4], parts[1]);
}
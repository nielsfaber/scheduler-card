export function startOfWeek(locale) {
  const parts = locale.match(
    /^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i
  );

  const language = parts[1];
  const region = parts[4];

  const regionSat = 'AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g)!;
  const regionSun = 'AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(
    /../g
  )!;
  const languageSat = ['ar', 'arq', 'arz', 'fa'];
  const languageSun = 'amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu'.match(/../g)!;

  if (region) return regionSun.includes(region) ? 'sun' : regionSat.includes(region) ? 'sat' : 'mon';
  else return languageSun.includes(language) ? 'sun' : languageSat.includes(language) ? 'sat' : 'mon';
}

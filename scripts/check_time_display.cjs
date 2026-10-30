// Run with: node scripts/check_time_display.cjs
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');

// Load the real formatter and its dependencies without adding a test framework.
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
const { computeTimeDisplay } = require('../src/data/format/compute_time_display.ts');

const labels = {
  en: { sunrise: 'Sunrise', sunset: 'Sunset', before: 'Before', after: 'After' },
  nl: { sunrise: 'Zonsopkomst', sunset: 'Zonsondergang', before: 'Voor', after: 'Na' },
};
const expected = {
  en: { clock: 'At 22:00', sunrise: 'At sunrise', sunset: 'At sunset',
    before: '00:30 before sunset', after: '00:30 after sunrise', clock12: 'At 10:00 pm' },
  nl: { clock: 'Om 22:00', sunrise: 'Bij zonsopkomst', sunset: 'Bij zonsondergang',
    before: '00:30 voor zonsondergang', after: '00:30 na zonsopkomst', clock12: 'Om 10:00 pm' },
};

let checks = 0;
const failures = [];
for (const language of ['en', 'nl']) {
  const hass = {
    language,
    locale: { language, time_format: '24' },
    localize: key => labels[language][key.split('.').pop()] || '',
  };
  const cases = [
    ['22:00:00', expected[language].clock],
    ['sunrise+00:00:00', expected[language].sunrise],
    ['sunset+00:00:00', expected[language].sunset],
    ['sunset-00:30:00', expected[language].before],
    ['sunrise+00:30:00', expected[language].after],
    ['sunset-00:01:00', expected[language].sunset],
    ['sunset+00:01:00', expected[language].sunset],
  ];
  for (const [input, output] of cases) {
    const actual = computeTimeDisplay(input, undefined, hass);
    checks++;
    if (actual !== output) failures.push(`${language} ${input}: ${actual} (expected ${output})`);
  }
  hass.locale.time_format = '12';
  assert.equal(computeTimeDisplay('22:00:00', undefined, hass), expected[language].clock12);
  checks++;
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`PASS: ${checks} real-formatter checks, English and Dutch`);

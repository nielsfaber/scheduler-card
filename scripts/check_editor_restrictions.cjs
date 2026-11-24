// Run with: node scripts/check_editor_restrictions.cjs
const assert = require('node:assert/strict');
const { readdirSync, readFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
    fileName: filename,
  });
  module._compile(outputText, filename);
};

const { validateConfig } = require('../src/data/validate_config.ts');
const { localize } = require('../src/localize/localize.ts');

const restrictionKeys = [
  'show_delete_button',
  'show_options_tab',
  'show_editor_mode_button',
  'lock_actions',
];

// configs without the new options are left untouched
const legacyConfig = { include: ['light.living_room'] };
assert.deepEqual(validateConfig(legacyConfig), legacyConfig);

const restrictedConfig = {
  show_delete_button: false,
  show_options_tab: false,
  show_editor_mode_button: false,
  lock_actions: true,
};
assert.deepEqual(validateConfig(restrictedConfig), restrictedConfig);

for (const key of restrictionKeys) {
  assert.throws(() => validateConfig({ [key]: 'true' }), new RegExp(`'${key}' must be a boolean`));
}

// editor_tags accepts a tag or a list of tags
assert.deepEqual(validateConfig({ editor_tags: 'heating' }), { editor_tags: 'heating' });
assert.deepEqual(validateConfig({ editor_tags: ['heating', 'vacuum'] }), { editor_tags: ['heating', 'vacuum'] });
assert.throws(() => validateConfig({ editor_tags: true }), /'editor_tags' must be a string or list of strings/);

// every card editor label resolves in every language (directly or through the English fallback)
const labelKeys = ['show_add_button', ...restrictionKeys, 'editor_tags'].map(
  (e) => `ui.panel.card_editor.fields.${e}.heading`
);
const languagesDir = path.join(__dirname, '../src/localize/languages');
const languages = readdirSync(languagesDir).map((e) => path.basename(e, '.json'));

for (const language of languages) {
  for (const key of labelKeys) {
    const label = localize(key, { locale: { language } });
    assert.ok(typeof label == 'string' && label.length && label != key, `'${key}' is missing for '${language}'`);
  }
}

// the labels are defined in the reference language and in the languages provided with this change
for (const language of ['en', 'pl']) {
  const translations = JSON.parse(readFileSync(path.join(languagesDir, `${language}.json`), 'utf8'));
  for (const key of labelKeys) {
    const value = key.split('.').reduce((o, i) => (o ? o[i] : undefined), translations);
    assert.equal(typeof value, 'string', `'${key}' is not defined in ${language}.json`);
  }
}

console.log(`PASS: editor restriction configuration checks (${languages.length} languages)`);

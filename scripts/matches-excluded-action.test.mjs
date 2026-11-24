import assert from 'node:assert/strict';
import { test } from 'node:test';
import { matchesExcludedAction } from '../src/data/actions/matches_excluded_action.ts';

test('exclusion matches at the beginning and inside a name, ignoring case', () => {
  assert.equal(matchesExcludedAction('turn_on', 'TURN'), true);
  assert.equal(matchesExcludedAction('turn_on', 'ON'), true);
  assert.equal(matchesExcludedAction('turn_on', 'toggle'), false);
});

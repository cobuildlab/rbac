import { test, expect } from '@jest/globals';
import { Rules } from '../rules';

test('Test static rules', () => {
  const staticRules = new Rules();
  staticRules.role('admin').permission('dashboard').can(true, 'Access granted');
  staticRules
    .role('manager')
    .permission('dashboard')
    .can(false, 'Access denied');
  expect(staticRules.check('admin', 'dashboard')).toStrictEqual([
    true,
    'Access granted',
  ]);
  expect(staticRules.check('manager', 'dashboard')).toStrictEqual([
    false,
    'Access denied',
  ]);
});

test('Test dynamic rules', () => {
  const dynamic = new Rules();
  const testData = { id: 'test' };
  dynamic
    .role('admin')
    .permission('dashboard')
    .dynamic((data: any) => {
      const result = data.id === testData.id;
      const message = result ? 'Access granted' : 'Access denied';
      return [result, message];
    });
  expect(dynamic.check('admin', 'dashboard', testData)).toStrictEqual([
    true,
    'Access granted',
  ]);
  expect(
    dynamic.check('admin', 'dashboard', { id: 'error-id' }),
  ).toStrictEqual([false, 'Access denied']);
});

test('Test default rules', () => {
  const rule = new Rules();
  rule.role('admin').permission('dashboard').can(false);
  rule.setDefaultRole('admin');
  expect(rule.check(null, 'dashboard')).toStrictEqual([false]);
  expect(() => {
    rule.setDefaultRole('error-role');
  }).toThrow('Role not fund in rules');
});

test('Unexpected use of check', () => {
  const rule = new Rules();
  rule.role('admin').permission('dashboard').can(false);
  expect(rule.check(null, 'dashboard')).toStrictEqual([
    false,
    'Not default role or default-role found',
  ]);
  expect(rule.check('error-role', 'dashboard')).toStrictEqual([
    false,
    'Not permission error-role found in rules',
  ]);
});

test('Unexpected permission assignment', () => {
  const rule = new Rules();

  expect(() => {
    rule.permission('dashboard');
  }).toThrow('Role not defined');
  expect(() => {
    rule.role('admin').can(true);
  }).toThrow('Permssion not defined');
});

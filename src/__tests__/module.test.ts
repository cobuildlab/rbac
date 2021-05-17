import { test, expect } from '@jest/globals';
import { RBAC } from '../rbac';

test('Test static rules', () => {
  const staticRules = new RBAC();
  staticRules.createRule('admin', 'dashboard', true, 'Access granted');
  staticRules.createRule('manager', 'dashboard', false, 'Access denied');

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
  const dynamic = new RBAC();
  const testData = { id: 'test' };
  dynamic.createRule('admin', 'dashboard', (data: any) => {
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
  const rule = new RBAC();
  rule.createRule('admin', 'dashboard', false, 'Access granted');
  rule.setDefaultRole('admin');
  expect(rule.check(null, 'dashboard')).toStrictEqual([
    false,
    'Access granted',
  ]);
  expect(() => {
    rule.setDefaultRole('error-role');
  }).toThrow('Role not fund in rules');
});

test('Unexpected use of check', () => {
  const rule = new RBAC();
  rule.createRule('admin', 'dashboard', false, 'Access granted');
  expect(rule.check(null, 'dashboard')).toStrictEqual([
    false,
    'Not default role or default-role found',
  ]);
  expect(rule.check('error-role', 'dashboard')).toStrictEqual([
    false,
    'Not permission error-role found in rules',
  ]);
});

import { test, expect } from '@jest/globals';
import { RBAC } from '../rbac';

test('Test static rules', () => {
  enum Roles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
  }
  enum Permissions {
    DASHBOARD = 'DASHBOARD',
  }

  const staticRules = new RBAC(Roles, Permissions);
  staticRules.createRule(
    Roles.ADMIN,
    Permissions.DASHBOARD,
    true,
    'Access granted',
  );
  staticRules.createRule(
    Roles.MANAGER,
    Permissions.DASHBOARD,
    false,
    'Access denied',
  );
  expect(staticRules.check(Roles.ADMIN, Permissions.DASHBOARD)).toStrictEqual([
    true,
    'Access granted',
  ]);
  expect(
    staticRules.check(Roles.MANAGER, Permissions.DASHBOARD),
  ).toStrictEqual([false, 'Access denied']);
});

test('Test dynamic rules', () => {
  enum Roles {
    ADMIN = 'ADMIN',
  }
  enum Permissions {
    DASHBOARD = 'DASHBOARD',
  }

  const dynamic = new RBAC<
    typeof Roles,
    typeof Permissions,
    { DASHBOARD: { id: string } }
  >();
  const testData = { id: 'test' };
  dynamic.createRule(
    Roles.ADMIN,
    Permissions.DASHBOARD,
    (data: { id: string }) => {
      const result = data.id === testData.id;
      const message = result ? 'Access granted' : 'Access denied';
      return [result, message];
    },
  );
  expect(
    dynamic.check(Roles.ADMIN, Permissions.DASHBOARD, testData),
  ).toStrictEqual([true, 'Access granted']);
  expect(
    dynamic.check(Roles.ADMIN, Permissions.DASHBOARD, { id: 'error-id' }),
  ).toStrictEqual([false, 'Access denied']);
});

test('Test default rules', () => {
  enum Roles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
  }
  enum Permissions {
    DASHBOARD = 'DASHBOARD',
  }
  const rule = new RBAC<typeof Roles, typeof Permissions>();
  rule.createRule(Roles.ADMIN, Permissions.DASHBOARD, false, 'Access granted');
  rule.setDefaultRole(Roles.ADMIN);
  expect(rule.check(null, Permissions.DASHBOARD)).toStrictEqual([
    false,
    'Access granted',
  ]);
  expect(() => {
    rule.setDefaultRole(Roles.MANAGER);
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

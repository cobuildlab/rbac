import { test, expect } from '@jest/globals';
import { RBAC } from '../rbac';

test('Test static rules', () => {
  enum Roles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
  }
  enum Permissions {
    DASHBOARD = 'DASHBOARD',
    SETTINGS = 'SETTINGS',
  }

  const staticRules = new RBAC<Roles, Permissions>(Roles.ADMIN);

  staticRules.createRule(
    Roles.ADMIN,
    Permissions.DASHBOARD,
    true,
    'Access granted',
  );
  staticRules.createRule(
    Roles.ADMIN,
    Permissions.SETTINGS,
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
  expect(staticRules.check(Roles.ADMIN, Permissions.SETTINGS)).toStrictEqual([
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

  const dynamic = new RBAC<Roles, Permissions, { DASHBOARD: { id: string } }>(
    Roles.ADMIN,
  );
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
  const rule = new RBAC<Roles, Permissions>(Roles.ADMIN);
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

import { test, expect } from '@jest/globals';
import { checkGenerator } from '../utils';
import { RulesType } from '../types';

test('test static rules', () => {
  enum roles {
    admin = 'admin',
    manager = 'manager',
  }

  enum rules {
    dashboard = 'dashboard',
  }

  const testRules: RulesType<roles, rules> = {
    [roles.admin]: {
      [rules.dashboard]: {
        can: true,
        message: 'message',
      },
    },
    [roles.manager]: {
      [rules.dashboard]: {
        can: false,
        message: 'message',
      },
    },
  };

  const check = checkGenerator(testRules);
  expect(check(roles.admin, rules.dashboard)).toStrictEqual([true, 'message']);
  expect(check(roles.manager, rules.dashboard)).toStrictEqual([
    false,
    'message',
  ]);
});

test('test dynamic rules', () => {
  const data = {
    id: 'test-id',
  };

  enum roles {
    admin = 'admin',
  }

  enum rules {
    dashboard = 'dashboard',
  }

  const testRules: RulesType<roles, rules> = {
    [roles.admin]: {
      [rules.dashboard]: {
        message: 'message',
        validator: (data: Record<'id', unknown>) => [
          data.id === 'test-id',
          data.id === 'test-id' ? 'Success message' : 'Error message',
        ],
      },
    },
  };

  const check = checkGenerator(testRules);
  expect(check(roles.admin, rules.dashboard, data)).toStrictEqual([
    true,
    'Success message',
  ]);
  expect(
    check(roles.admin, rules.dashboard, { id: 'error-id' }),
  ).toStrictEqual([false, 'Error message']);
});

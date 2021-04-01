import { test, expect } from '@jest/globals';
import { checkGenerator } from '../utils';
import { RulesType } from '../types';

test('Test', () => {
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

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
        message: 'any',
      },
    },
    [roles.manager]: {
      [rules.dashboard]: {
        can: false,
      },
    },
  };

  const check = checkGenerator(testRules);
  expect(check(roles.admin, rules.dashboard, {})[0]).toBeTruthy();
  expect(check(roles.manager, rules.dashboard, {})[0]).toBeFalsy();
});

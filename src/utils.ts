import { RulesType, FunctionCheckType } from './types';

export const checkGenerator = <R extends string, P extends string>(
  rules: RulesType<R, P>,
): FunctionCheckType<R, P> => {
  return (role: R, permissionName: P, data: any): [boolean, string] => {
    const currentRole = role ? rules[role] : null;

    if (!currentRole) {
      console.error(
        'Check error: the role could not be found within the rules',
      );
      return [
        false,
        'Check error: the role could not be found within the rules',
      ];
    }

    const permission = currentRole[permissionName];
    if (permission.can && typeof permission.can === 'boolean') {
      return [permission.can, permission?.message || ''];
    } else if (permission.can && typeof permission.can === 'function') {
      return permission.can(data);
    }

    return [false, 'Not Permission found in rules'];
  };
};

/*
  enum test {
    hola = 'hola'
  }

  const testRules: RulesType<test, test> = {
    [test.hola]:{
      [test.hola]:{
        can: true,
        message: 'any'
      }
    }
  }

  const check = checkGenerator(testRules);

  check(test.hola, test.hola, {});
*/

import { RulesType, FunctionCheckType } from './types';

/**
 * @description - Generate a check function,
 * this is used to avoid passing the rules every time the check function is used.
 * @param rules - Rules for the check functions.
 * @returns {FunctionCheckType} - Return a check function with the rules already configured.
 */
export const checkGenerator = <Role extends string, RuleName extends string>(
  rules: RulesType<Role, RuleName>,
): FunctionCheckType<Role, RuleName> => (
    role: Role,
    permissionName: RuleName,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
  ): [boolean, string] => {
    const currentRole = role ? rules[role] : null;

    if (!currentRole) {
      console.error('Check error: the role could not be found within the rules');
      return [false, 'Check error: the role could not be found within the rules'];
    }

    const permission = currentRole[permissionName];
    if (typeof permission?.can === 'boolean') {
      return [permission.can, permission?.message || ''];
    }

    if (typeof permission?.validator === 'function') {
      return permission.validator(data);
    }

    return [false, 'Not Permission found in rules'];
  };

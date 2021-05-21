/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RulesType, ValidatorFunctionType } from './types';

export class RBAC<R extends Record<string,string>,P extends Record<string,string>,D extends Partial<Record<keyof P,unknown>> = {}> {


  private rules: Partial<RulesType<R,P>> = {};
  private currentRole:keyof R = '';

  constructor(roles?:R,permissions?:P){

  }
  createRule(
    roleName: keyof R,
    permissionName: keyof P,
    test: boolean | ValidatorFunctionType<D[keyof P]>,
    message?: string,
  ): void {
    Object.assign(this.rules, {
      [roleName]: {
        [permissionName]: {
          can: typeof test === 'boolean' ? test : undefined,
          dynamic: typeof test === 'function' ? test : undefined,
          message,
        },
      },
    });
  }

  /**
   * @description - Check if a role is withing the rules.
   * @param role - Role to fined in rules.
   * @returns {boolean} - Return true is find the role.
   */
  private isRoleInRules(role: string): boolean {
    return Boolean(this.rules[role]);
  }

  /**
   * @description - Check if a permission is withing the a role.
   * @param role - Role to fined in rules.
   * @param permission - Permission to fined in the role.
   * @returns {boolean} - Return true is find the permission.
   */
  private isPermissionInRole(role: keyof R, permission: keyof P): boolean {
    return Boolean(this.rules[role]?.[permission]);
  }

  /**
   * @description - Configure a default role to avoid passing it every time in the check function.
   * @param name - Role name.
   */
  setDefaultRole(name: string): void {
    if (this.isRoleInRules(name)) {
      this.currentRole = name;
    } else {
      throw new Error('Role not fund in rules');
    }
  }

  /**
   * @description - Function check used for validation.
   * @param role - Role to find for test.
   * @param permission - Permission t find for test.
   * @param data - Data for dynamic permission.
   * @returns {Array<boolean, string>} - Result of test.
   */
  check(
    role: keyof R ,
    permission: keyof P,
    data?: D[keyof P],
  ): [boolean, string?] {
    let currentRole:keyof R = '';

    if (this.currentRole?.length && !role) {
      currentRole = this.currentRole;
    } else if (role) {
      currentRole = role;
    } else {
      console.error('Not default role or default-role found');
      return [false, 'Not default role or default-role found'];
    }

    if (!this.isPermissionInRole(currentRole, permission)) {
      console.error(`Not permission ${currentRole} found in rules`);
      return [false, `Not permission ${currentRole} found in rules`];
    }

    const _permission = this.rules[currentRole][permission];

    if (typeof _permission?.can !== 'undefined') {
      const result: [boolean, string?] = [_permission.can];
      if (_permission.message) {
        result.push(_permission.message);
      }
      return result;
    }

    if (typeof _permission?.dynamic !== 'undefined' && data) {
      return _permission.dynamic(data);
    }
    return [false, 'Not Permission found in rules'];
  }
}
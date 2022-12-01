/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RulesType, ValidatorFunctionType } from './types';

export class RBAC<
  R extends string,
  P extends string,
  D extends Partial<Record<P, unknown>> = {}
> {
  private rules: Partial<RulesType<R, P>> = {};
  private currentRole: R;

  constructor(defualtRole: R) {
    this.currentRole = defualtRole;
  }

  /**
   * @description - Generate a role and assign a permission.
   * @param roleName - Role name.
   * @param permissionName - Permission Name.
   * @param test - Boolean o function to call in check function.
   * @param message - Error message.
   */
  createRule(
    roleName: R,
    permissionName: P,
    test: boolean | ValidatorFunctionType<D[P]>,
    message?: string,
  ): void {
    if (this.rules[roleName]) {
      Object.assign(this.rules[roleName], {
        [permissionName]: {
          can: typeof test === 'boolean' ? test : undefined,
          dynamic: typeof test === 'function' ? test : undefined,
          message,
        },
      });
    } else {
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
  }

  /**
   * @description - Check if a role is withing the rules.
   * @param role - Role to fined in rules.
   * @returns {boolean} - Return true is find the role.
   */
  private isRoleInRules(role: R): boolean {
    return Boolean(this.rules[role]);
  }

  /**
   * @description - Check if a permission is withing the a role.
   * @param role - Role to fined in rules.
   * @param permission - Permission to fined in the role.
   * @returns {boolean} - Return true is find the permission.
   */
  private isPermissionInRole(role: R, permission: P): boolean {
    return Boolean(this.rules[role]?.[permission]);
  }

  /**
   * @description - Configure a default role to avoid passing it every time in the check function.
   * @param name - Role name.
   */
  setDefaultRole(name: R): void {
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
  check(role: R | null, permission: P, data?: D[P]): [boolean, string?] {
    const currentRole: R = role ?? this.currentRole;

    if (!this.currentRole?.toString()?.length && !role) {
      console.error('Not default role or default-role found');
      return [false, 'Not default role or default-role found'];
    }

    if (!this.isPermissionInRole(currentRole, permission)) {
      console.error(`Not permission ${currentRole} found in rules`);
      return [false, `Not permission ${currentRole} found in rules`];
    }

    const rules = this.rules[currentRole];

    const _permission = rules ? rules[permission] : {};

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

  simpleCheck(role: R | null, permission: P, data?: D[P]): boolean {
    return this.check(role, permission, data)[0];
  }
}

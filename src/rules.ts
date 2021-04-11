/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RulesType, ValidatorFunctionType } from './types';

export class Rules {
  private rules: RulesType = {};
  private current = '';
  private currentPermission = '';
  private currentRole = '';

  /**
   * @description - Check if the currently assigned role is within the rules.
   */
  private checkCurrentRole(): void {
    if (!this.rules[this.current]) {
      throw new Error('Role not defined');
    }
  }

  /**
   * @description -  Check if the currently assigned permission is within the current role.
   */
  private checkCurrentPermission(): void {
    if (!this.rules[this.current][this.currentPermission]) {
      throw new Error('Permssion not defined');
    }
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
  private isPermissionInRole(role: string, permission: string): boolean {
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
   * @description - Added a role to rules.
   * @param name - Role name.
   * @returns {Rules} -
   */
  role(name: string): this {
    if (!this.isRoleInRules(name)) {
      Object.assign(this.rules, { [name]: {} });
    }
    this.current = name;
    return this;
  }

  /**
   * @description - Added a permission to a role.
   * @param name - Permission name.
   * @returns {Rules} -
   */
  permission(name: string): this {
    this.checkCurrentRole();
    if (!this.isPermissionInRole(this.current, name)) {
      Object.assign(this.rules[this.current], { [name]: {} });
    }
    this.currentPermission = name;
    return this;
  }

  /**
   * @description - Used for added validation for static permission.
   * @param status - Valued used in check.
   * @param message - Message for current permission.
   * @returns {Rules} -
   */
  can(status: boolean, message?: string): this {
    this.checkCurrentPermission();
    Object.assign(this.rules[this.current][this.currentPermission], {
      can: status,
    });
    if (message) {
      this.message(message);
    }
    return this;
  }

  /**
   * @description - Used for added a dynamic validation for a permission.
   * @param cb - Callback used in check funcion for validation.
   * @returns {Rules} -
   */
  dynamic(cb: ValidatorFunctionType): this {
    this.checkCurrentPermission();
    Object.assign(this.rules[this.current][this.currentPermission], {
      dynamic: cb,
    });
    return this;
  }

  /**
   * @description - Added a message to current permission.
   * @param message - Message.
   */
  private message(message: string): void {
    this.checkCurrentPermission();
    Object.assign(this.rules[this.current][this.currentPermission], {
      message,
    });
  }

  /**
   * @description - Function check used for validation.
   * @param role - Role to find for test.
   * @param permission - Permission t find for test.
   * @param data - Data for dynamic permission.
   * @returns {Array<boolean, string>} - Result of test.
   */
  check(
    role: string | null,
    permission: string,
    data?: any,
  ): [boolean, string?] {
    let currentRole = '';

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

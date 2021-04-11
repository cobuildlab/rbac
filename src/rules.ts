/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RulesType, ValidatorFunctionType } from './types';

export class Rules {
  private rules: RulesType = {};
  private current = '';
  private currentPermission = '';
  private currentRole = '';

  private checkCurrentRole(): void {
    if (!this.rules[this.current]) {
      throw new Error('Role not defined');
    }
  }

  private checkCurrentPermission(): void {
    if (!this.rules[this.current][this.currentPermission]) {
      throw new Error('Permssion not defined');
    }
  }

  private isRoleInRules(role: string): boolean {
    return Boolean(this.rules[role]);
  }

  private isPermissionInRole(role: string, permission: string): boolean {
    return Boolean(this.rules[role]?.[permission]);
  }

  setDefaultRole(name: string): void {
    if (this.isRoleInRules(name)) {
      this.currentRole = name;
    } else {
      throw new Error('Role not fund in rules');
    }
  }

  role(name: string): this {
    if (!this.isRoleInRules(name)) {
      Object.assign(this.rules, { [name]: {} });
    }
    this.current = name;
    return this;
  }

  permission(name: string): this {
    this.checkCurrentRole();
    if (!this.isPermissionInRole(this.current, name)) {
      Object.assign(this.rules[this.current], { [name]: {} });
    }
    this.currentPermission = name;
    return this;
  }

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

  dynamic(cb: ValidatorFunctionType): this {
    this.checkCurrentPermission();
    Object.assign(this.rules[this.current][this.currentPermission], {
      dynamic: cb,
    });
    return this;
  }

  private message(message: string): void {
    this.checkCurrentPermission();
    Object.assign(this.rules[this.current][this.currentPermission], {
      message,
    });
  }

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

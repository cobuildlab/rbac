/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RulesType, ValidatorFunctionType } from './types';

export class Rules {
  private rules: RulesType = {};
  private current = '';
  private currentPermission = '';
  private currentRole = '';

  private checkCurrent(): void {
    if (!this.rules[this.current]) {
      throw new Error('Role not defined');
    }
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

  setDefaultRole(name: string) {
    this.currentRole = name;
  }

  role(name: string): this {
    if (!this.isRoleInRules(name)) {
      Object.assign(this.rules, { [name]: {} });
    }
    this.current = name;
    return this;
  }

  permission(name: string): this {
    if (!this.isPermissionInRole(this.current, name)) {
      Object.assign(this.rules[this.current], { [name]: {} });
    }
    this.currentPermission = name;
    return this;
  }

  can(status: boolean): this {
    this.checkCurrent();
    Object.assign(this.rules[this.current][this.currentPermission], {
      can: status,
    });
    return this;
  }

  dynamic(cb: ValidatorFunctionType): this {
    this.checkCurrent();
    Object.assign(this.rules[this.current][this.currentPermission], {
      dynamic: cb,
    });
    return this;
  }

  message(message: string): void {
    this.checkCurrent();
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
      return [false];
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

const test = new Rules();

test.role('new').permission('dashboard').can(true);
test
  .role('new')
  .permission('dashboard')
  .dynamic((data: { id: string }) => {
    return [data.id === 'jamon'];
  });

test.role('agent').permission('dashboard').can(false).message('some message');

console.log('test 1', test.check('new', 'dashboard', { id: 'test' }));
console.log('test 2', test.check('agent', 'dashboard', { id: 'test' }));

test.setDefaultRole('new');

console.log('default role');
console.log('test 1', test.check(null, 'dashboard', { id: 'test' }));
console.log('test 2', test.check(null, 'dashboard', { id: 'casa' }));

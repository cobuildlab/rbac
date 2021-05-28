# Role-Based Access Control

Role-based access control (RBAC) refers to the idea of assigning permissions to users based on their role within an organization. It offers a simple, manageable approach to access management that is less prone to error than assigning permissions to users individually.

### RBAC architecture conventions discussion

https://github.com/cobuildlab/conventions/issues/24

<br/>

## Goals:

- create systematic, repeatable assignment of permissions

- easily audit user privileges and correct identified issues

- quickly add and change roles, as well as implement them across APIs

- cut down on the potential for error when assigning user permissions

- integrate third-party users by giving them pre-defined roles

- more effectively comply with regulatory and statutory requirements for confidentiality and privacy

- RBAC Model

## Installation

1. Run on your terminal the following command:

```sh
$ npm i @cobuildlab/rbac
```

[`Example`](#Examples)

### Basic use (Strictly types by defualt)

```typescript
// It is strictly typed so it need enums declared before initialization
enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

enum Permissions {
  DASHBOARD = 'DASHBOARD',
}

// It needs the Roles and Permissions passed as generics, and a default role.
const RBACproject = new RBAC<Roles, Permissions>(Roles.ADMIN);

// defined the rules
RBACproject.createRule(
  Roles.ADMIN,
  Permissions.DASHBOARD,
  true,
  'Access granted',
);
RBACproject.createRule(
  Roles.MANAGER,
  Permissions.DASHBOARD,
  false,
  'Access denied',
);

RBACproject.check(Roles.ADMIN, Permissions.DASHBOARD); // [true, 'Access granted']
```

### Declaring dynamic rules

```typescript
// It is strictly typed so it need enums declared before initialization
enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

enum Permissions {
  DASHBOARD = 'DASHBOARD',
}

// It accept a type for the dinamic data of the permission
const RBACdynamic = new RBAC<
  Roles,
  Permissions,
  { DASHBOARD: { shouldEdit: boolean } }
>(Roles.ADMIN);

// Here data will be types as `{ shouldEdit: boolean }`
RBACdynamic.createRule(Roles.ADMIN, Permissions.DASHBOARD, (data) => {
  const result = data.shouldEdit;

  const message = result ? 'Access granted' : 'Access denied';
  return [result, message];
});

const testData = { shouldEdit: true }; // fake data
RBACdynamic.check(Roles.ADMIN, Permissions.DASHBOARD, testData);
```

### Set default role

```typescript
enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

enum Permissions {
  DASHBOARD = 'DASHBOARD',
}

const defaultRole = new RBAC<Roles, Permissions>(Roles.MANGER);

defaultRole.createRule(
  Roles.ADMIN,
  Permissions.DASHBOARD,
  false,
  'Access granted',
);

// This method allows to set a defualt role, after initialization
defaultRole.setDefaultRole(Roles.ADMIN);

defaultRole.check(null, Permissions.DASHBOARD); // [false, 'Access granted']
```

### Integration with React

```tsx
enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

enum Permissions {
  AGENT_ADMIN_USER_DETAILS = 'AGENT_ADMIN_USER_DETAILS',
}

const RBAC = new RBAC<Roles, Permissions>(Roles.MANGER);

RBAC.createRule(
  Roles.ADMIN,
  Permissions.AGENT_ADMIN_USER_DETAILS,
  false,
  'Access granted',
);

const RoleAuthorization = ({ render, error, permission }) => {
  const [canRender, message] = RBAC.check('admin', permission, data);
  if (canRender) {
    return render(message);
  }
  return error ? error(message) : null;
};

const MyComponent = () => (
  <RoleAuthorization
    permission={'AGENT_ADMIN_USER_DETAILS'}
    render={() => <UserDetialsView />}
    error={() => <div>You dont have permission</div>}
  />
);
```

### Integration with Node.js

```ts
const api = require('api-request');

enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

enum Permissions {
  CAN_READ_USERS = 'CAN_READ_USERS',
}

const RBAC = new RBAC<Roles, Permissions>(Roles.MANGER);

RBAC.createRule(
  Roles.ADMIN,
  Permissions.CAN_READ_USERS,
  true,
  'Access granted',
);

if (RBAC.check(Roles.ADMIN, Permissions.CAN_READ_USERS)) {
  api.getUser().then((users) => {
    //Do some stuff with uses.
  });
}
```

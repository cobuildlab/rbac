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

### Function check use
```typescript
  enum roles {
    admin = 'admin',
    manager = 'manager',
  }

  enum permissions {
    dashboard = 'dashboard',
  }

  const Rules: RulesType<roles, permissions> = {
    [roles.admin]: {
      [permissions.dashboard]: {
        can: true,
        message: 'message',
      },
    },
    [roles.manager]: {
      [permissions.dashboard]: {
        message: 'message',
        validator: (data: Record<'id', unknown>) => [
          data.id === 'test-id',
          data.id === 'test-id' ? 'Success message' : 'Error message',
        ],
      },
    },
  };

  // added checkGenerator in shared 
  const check = checkGenerator(testRules);

  // static permission
  check(roles.admin, permissions.dashboard)

  // dynamic permission
  check(roles.admin, rules.dashboard, { id: 'test-id' }))
```

### Integration with React

```typescript
const RoleAuthorization: FC<RoleAuthorizationProps> = ({
  render,
  error,
  permission,
}) => {
  const [canRender, message] = check(user.role.admin, permission, data);
  if (canRender) {
    return render(message);
  }
  return error ? error(message) : null;
};
```

```typescript
<RoleAuthorization
  permission={PermissionNames.AGENT_ADMIN_USER_DETAILS}
  render={() => <UserDetialsView />}
  error={() => <div>You dont have permission</div>}
/>
```
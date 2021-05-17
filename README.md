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
### Basic use

```typescript
  const RBACproject = new RBAC();

  // defined the rules
  RBACproject.createRule('admin', 'dashboard', true, 'Access granted');
  RBACproject.createRule('manager', 'dashboard', false, 'Access denied');

 
  RBACproject.check('admin', 'dashboard') // [true, 'Access granted']
```

### Declaring dynamic rules

```typescript
  const RBACdynamic = new RBAC();

  // defined dynamic rules
  RBACdynamic.createRule('admin', 'dashboard', (data: any) => {
    const result = data.id === testData.id;
    const message = result ? 'Access granted' : 'Access denied';
    return [result, message];
  });

  const testData = { id: 'test' }; // fake data
  RBACdynamic.check('admin', 'dashboard', testData)
```


### Set default role

```typescript
  const defaultRole = new RBAC();

  defaultRole.createRule('admin', 'dashboard', false, 'Access granted');
  defaultRole.setDefaultRole('admin');

  rule.check(null, 'dashboard') // [false, 'Access granted']
```

### Integration with React

```js
const RBAC = new RBAC();
RBAC.createRule('admin', 'AGENT_ADMIN_USER_DETAILS', false, 'Access granted');

const RoleAuthorization = ({
  render,
  error,
  permission,
}) => {
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

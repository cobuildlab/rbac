import { PermissionsNames, RoleNames } from './rbac-contants';

export type CheckType = (
  role: RoleNames,
  permissionName: PermissionsNames,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) => [boolean, string];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatorType = (data: any) => [boolean, string];
export type PermissionType = {
  [key: string]: boolean | ValidatorType;
};

export type RulesType = {
  permissions: {
    [RoleNames.AGENT_ADMINISTRATOR]: PermissionType;
    [RoleNames.AGENT_MANAGER]: PermissionType;
  };
  message: {
    success?: {
      // key: roles, --> message
      [key: string]: string;
    };
    error?: {
      // key: roles, --> message
      [key: string]: string;
    };
    default: {
      permissionNotDefined: string;
      message: string;
      roleNotDefined: string;
    };
  };
};

/* 
  Advantages of the Role-Based Access Control Strategy
  Among the advantages of using Role-Based Access Control, it is important to highlight that:

  Since all the permissions are at one place, when requirements change, you just have to add or remove permissions of the roles.
  Creating new roles is very easy.
  The strategy favors declarative programming because all the roles and the permissions associated with them are explicitly defined.

  https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/
*/
import { PermissionsNames, RoleNames } from './rbac-contants';
import { RulesType } from './rbac-models';
import {
  userStatusPermission,
  userProfieEditPermission,
} from './rbac-validators';

export const rules: RulesType = {
  permissions: {
    [RoleNames.AGENT_ADMINISTRATOR]: {
      [PermissionsNames.AGENT_ADMIN_DASHBOARD]: true,
      [PermissionsNames.AGENT_BROKERAGE_UPDATE]: true,
      [PermissionsNames.AGENT_STATUS_UPDATE]: true,
      [PermissionsNames.DASHBOARD_VIEW]: userStatusPermission,
      [PermissionsNames.MY_PROFILE_VIEW]: userStatusPermission,
      [PermissionsNames.AGENT_ADMIN_USER_TABLE]: userStatusPermission,
      [PermissionsNames.AGENT_ADMIN_USER_DETAILS]: userStatusPermission,
      [PermissionsNames.AGENT_ADMIN_USER_CREATE]: userStatusPermission,
      [PermissionsNames.LISTING_CREATE]: userStatusPermission,
    },
    [RoleNames.AGENT_MANAGER]: {
      [PermissionsNames.AGENT_DASHBOARD]: true,
      [PermissionsNames.DASHBOARD_VIEW]: userStatusPermission,
      [PermissionsNames.MY_PROFILE_VIEW]: userProfieEditPermission,
      [PermissionsNames.LISTING_CREATE]: userStatusPermission,
    },
  },
  message: {
    success: {},
    error: {
      [PermissionsNames.AGENT_ADMIN_DASHBOARD]: "You can't access this view",
      [PermissionsNames.AGENT_DASHBOARD]: "You can't access this view",
    },
    default: {
      roleNotDefined: 'Permissions Not defined',
      permissionNotDefined: 'Permissions Not defined',
      message: 'Access denied',
    },
  },
};

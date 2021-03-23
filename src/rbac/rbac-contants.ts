export enum PermissionsNames {
  // client permissions
  DASHBOARD_VIEW = 'dashboard-view:view',
  AGENT_DASHBOARD = 'agent-dashboard:component',
  AGENT_ADMIN_DASHBOARD = 'agent-admin-dashboard:component',
  AGENT_ADMIN_USER_TABLE = 'agent-admin-user-table:view',
  AGENT_ADMIN_USER_DETAILS = 'agent-admin-user-details:view',
  AGENT_ADMIN_USER_CREATE = 'agent-admin-user-create:view',
  MY_PROFILE_VIEW = 'my-profile:view',
  // backend permissions:
  // commont permissions:
  LISTING_CREATE = 'listing:create',

  // AGENT
  AGENT_BROKERAGE_UPDATE = 'agent-brokerage-update:update',
  AGENT_STATUS_UPDATE = 'agent-status-update:update',
}

export enum RoleNames {
  AGENT_ADMINISTRATOR = 'AGENT_ADMINISTRATOR',
  AGENT_MANAGER = 'AGENT_MANAGER',
}

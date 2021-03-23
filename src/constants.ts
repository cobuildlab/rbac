export const DATE_FORMAT_DISPLAY = 'MM/DD/YYYY';

export enum EightBaseRole {
  Guest = 'Guest',
  User = 'USER',
  Administrator = 'Administrator',
}

export enum AgentStatus {
  verified = 'VERIFIED',
  unVerified = 'UNVERIFIED',
  frozen = 'FROZEN',
}
export enum Visibility {
  public = 'PUBLIC',
  brokerage = 'BROKERAGE',
}

export enum SearchOrder {
  createdAtAsc = 'createdAt_ASC',
  createdAtDesc = 'createdAt_DESC',
  updatedAtAsc = 'updatedAt_ASC',
  updatedAtDesc = 'createdAt_ASC',
  sqFootageMaxAsc = 'sqFootageMax_ASC',
  sqFootageMaxDesc = 'sqFootageMax_DESC',
  budgetMaxAsc = 'budgetMax_ASC',
  budgetMaxDesc = 'budgetMax_DESC',
}

export const LICENCE_EXPIRED = 'LICENCE_EXPIRED';
export const LICENCE_VERIFIED = 'LICENCE_VERIFIED';

import { rules } from './rules';
import { CheckType } from './rbac-models';
import { PermissionsNames } from './rbac-contants';

/**
 * @description - Get message for the duple.
 * @param permissionName - Permission Name.
 * @param result - Result of validation in check.
 * @returns - Message.
 */
const getMessage = (
  permissionName: PermissionsNames,
  result?: boolean,
): string => {
  let message = '';
  if (result === true) {
    message = rules.message.success?.[permissionName] || '';
  } else if (result === false) {
    message = rules.message.error?.[permissionName] || '';
  } else {
    message = `Message not found for ${permissionName}`;
    console.warn(message);
  }
  return message;
};

/**
 * @description - Function that is in charge of validating the permissions according to the rules described.
 * @param role - User Role.
 * @param permissionName - Permission name used for search inside the rules.
 * @param data - Used for dynamic Validtor in rules.
 * @returns {Array<boolean, string>} - Dupla with the validation response.
 */
export const check: CheckType = (role, permissionName, data) => {
  const currentRole = role ? rules.permissions[role] : null;

  if (!currentRole) {
    console.error('Check error: the role could not be found within the rules');
    return [false, getMessage(permissionName)];
  }

  if (!permissionName) {
    console.error('Check error: Permission name no defined');
    return [false, getMessage(permissionName)];
  }

  const permission = currentRole[permissionName];
  if (permission && typeof permission === 'boolean') {
    return [permission, getMessage(permissionName)];
  } else if (permission && typeof permission === 'function') {
    return permission(data);
  }

  return [false, 'Not Permission found in rules'];
};

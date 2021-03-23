import { AgentType } from '../types/types';
import { AgentStatus } from '../constants';

/**
 * @description - Function used in dynamic permissions that checks the current status of an agent.
 * @param data - Data that the function will receive when it is invoked from the check.
 * @returns {Array<boolean, string>} - Dupla with the validation response.
 */
export const userStatusPermission = (data: AgentType): [boolean, string] => {
  const result = Boolean(data.status === AgentStatus.verified);
  const message = !result ? 'Agent not verify yet' : '';
  return [result, message];
};

interface UserProfileEditType extends AgentType {
  queryId: string;
}

/**
 * @description - Check that the id that comes from the query in the profile view is the same id as the logged-in agent.
 * @param data - Agent data type and queryId.
 * @returns {Array<boolean, string>} - Dupla with the validation response.
 */
export const userProfieEditPermission = (
  data: UserProfileEditType,
): [boolean, string] => {
  const { id } = data;
  const result = Boolean(id === data.queryId);
  const message = !result ? 'You cant access to this perfil' : '';
  return [result, message];
};

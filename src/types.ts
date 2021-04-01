export type RulesType<Role extends string, RuleName extends string> = {
  [key in Role]: {
    [key in RuleName]: {
      can?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator?: ValidatorFunctionType;
      message?: string;
    };
  };
};

export type FunctionCheckType<Role, RuleName> = (
  role: Role,
  permission: RuleName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) => [boolean, string];

export type ValidatorFunctionType<D = Record<string, unknown>> = (
  data: D,
) => [boolean, string];

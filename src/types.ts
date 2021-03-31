export type RulesType<Role extends string, RuleName extends string> = {
  [key in Role]: {
    [key in RuleName]: {
      can?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator?: (data: any) => [boolean, string];
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

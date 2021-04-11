export type RulesType = {
  [key: string]: {
    [key: string]: {
      can?: boolean;
      dynamic?: ValidatorFunctionType;
      message?: string;
    };
  };
};

export type ValidatorFunctionType = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => [boolean, string?];

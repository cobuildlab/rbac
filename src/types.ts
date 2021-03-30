export type RulesType<R extends string, P extends string> = {
  [key in R]: {
    [key in P]: {
      can?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator?: (data: any) => [boolean, string];
      message?: string;
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionCheckType<R, P> = (
  role: R,
  permission: P,
  data?: any,
) => void;

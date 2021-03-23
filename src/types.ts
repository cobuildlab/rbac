// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatorType = (data: any) => [boolean, string];

export type RulesType<R extends string, P extends string> = {
  [key in R]: {
      [key in P]:{
        can: boolean | ValidatorType;
        message?: string;
      }
  };
};

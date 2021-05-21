export type RulesType<R,P> = {
  [key in keyof R]: {
    [key in keyof P]: {
      can?: boolean;
      dynamic?: ValidatorFunctionType;
      message?: string;
    };
  };
};

export type ValidatorFunctionType<T = unknown> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: T,
) => [boolean, string?];

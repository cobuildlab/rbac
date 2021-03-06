// export type RulesType<R,P> = {
//   [role in keyof R]: {
//     [permission in keyof P]: {
//       can?: boolean;
//       dynamic?: ValidatorFunctionType;
//       message?: string;
//     };
//   };
// };

export type RulesType<R extends string, P extends string> = Record<
  R,
  Record<
    P,
    {
      can?: boolean;
      dynamic?: ValidatorFunctionType;
      message?: string;
    }
  >
>;
export type ValidatorFunctionType<T = unknown> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: T,
) => [boolean, string?];

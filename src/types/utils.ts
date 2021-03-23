import { UserType } from './types';


export interface Basic8BaseDataModel {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy?: UserType;
}

export interface RelationType<T> {
  count?: number;
  items?: Array<T>;
}

export type KeyFilterType = {
  id: string;
};

/**
 * @description - For relation one to one.
 * @param C - Create input type.
 */
export interface RelationInput<C> {
  connect?: KeyFilterType;
  create?: C | C[];
}

/**
 * @description - For relation one to many.
 * @param C - Create input type.
 */
export interface RelationOneToManyInput<C> {
  connect?: KeyFilterType[];
  create?: C | C[];
}

/**
 * @description - For Relation One to one.
 * @param U - Update input type.
 * @param C - Create input type.
 */
export interface RelationUptateInput<U, C> {
  connect?: KeyFilterType;
  disconnect?: KeyFilterType;
  reconnect?: KeyFilterType;
  create?: C;
  update?:
    | U
    | {
        filter: KeyFilterType;
        data: U;
      }[];
}

/**
 * @description - For releation one to many.
 * @param U - Update input type.
 * @param C - Create input type.
 */
export interface RelationUpdateManyInput<U, C> {
  connect?: KeyFilterType[];
  disconnect?: KeyFilterType[];
  reconnect?: KeyFilterType[];
  create?: C;
  update?:
    | U
    | {
        filter: KeyFilterType;
        data: U;
      }[];
}

export interface RelationFilter<T> {
  some?: T;
  every?: T;
  none?: T;
}

export interface IDPredicateType {
  equals?: string;
  not_equals?: string;
  in?: string[];
  not_int?: string[];
  contains?: string;
  not_contains?: string;
  start_with?: string;
  not_start_with?: string;
  ends_with?: string;
  not_ends_with?: string;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  is_empty?: string;
  is_not_empty?: boolean;
}

export interface DateTimePredicateType {
  equals?: any;
  not_equals?: any;
  in?: any;
  not_int?: any;
  lt?: any;
  lte?: any;
  gt?: any;
  gte?: any;
  is_empty?: any;
  is_not_empty?: boolean;
  // relative: DateRelativePridicate  TODO
}

export interface IntPredicateType {
  equals?: number;
  not_equals?: number;
  in?: number;
  not_int?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  is_empty?: boolean;
  is_not_empty?: boolean;
}

export interface StringPredicateType {
  equals?: string;
  not_equals?: string;
  in?: string[];
  not_in?: string[];
  contains?: string;
  not_contains?: string;
  starts_with?: string;
  not_starts_with?: string;
  ends_with?: string;
  not_ends_with?: string;
  is_empty?: boolean;
  is_not_empty?: boolean;
}

export interface BoolPredicateType {
  equals?: boolean;
  not_equals?: boolean;
  is_empty?: boolean;
  is_not_empty?: boolean;
}

export interface BasicFilterType {
  id?: IDPredicateType;
  createdAt?: DateTimePredicateType;
  updatedAt?: DateTimePredicateType;
  deletedAt?: IntPredicateType;
  _fullText?: string;
  // TODO:
  // createdBy: UserFilter
}
import {
  Basic8BaseDataModel,
  BasicFilterType,
  BoolPredicateType,
  DateTimePredicateType,
  IntPredicateType,
  RelationFilter,
  RelationType,
  StringPredicateType,
  KeyFilterType,
} from './utils';
import { EightBaseRole, AgentStatus, Visibility } from '../constants';

import { RoleNames } from '../rbac/rbac-contants';

export interface MetaJsonType {
  path: string;
  mimetype: string;
  size: number;
}

export interface FileType extends Basic8BaseDataModel {
  fileId: string;
  filename: string;
  downloadUrl?: string;
  id?: string;
  mimetype?: string;
  meta?: MetaJsonType;
  deletedAt?: string | number | Date;
  shareUrl?: string;
  public?: boolean;
  uploaded?: boolean;
}

export interface UserType extends Basic8BaseDataModel {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  language?: string;
  timezone?: string;
  birthDate?: Date;
  roles?: RelationType<RoleType>;
  avatar?: FileType;
  userAgentRelation?: RelationType<AgentType>;
}
export interface BrokerageType extends Basic8BaseDataModel {
  id?: string;
  name?: string;
  license?: string;
  brokerageAgentRelation?: RelationType<AgentType>;
}

export interface RoleType extends Basic8BaseDataModel {
  name?: EightBaseRole;
}

export interface AgentType extends Basic8BaseDataModel {
  id?: string;
  user?: UserType;
  role?: RoleNames;
  status?: AgentStatus;
  expirationDate?: string;
  license?: string;
  brokerage?: BrokerageType;
  agentListingRelation?: RelationType<ListingType>;
  profile?: AgentProfileType;
}

export interface ListingType extends Basic8BaseDataModel {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  propertyType?: string;
  sqFootageMax?: number;
  sqFootageMin?: number;
  budgetMax?: number;
  budgetMin?: number;
  bedrooms?: number;
  bathrooms?: number;
  stories?: number;
  notes?: string;
  visibility?: Visibility;
  agent?: AgentType;
  listingZipCodeRelation?: RelationType<ListingZipcodeType>;
  listingAmenitieListingRelation?: RelationType<ListingAmenitieType>;
}
export interface ListingAmenitieType extends Basic8BaseDataModel {
  id?: string;
  listing?: ListingType;
  amenitie?: AmenitieType;
  niceToHave?: boolean;
  mustToHave?: boolean;
}

export interface AmenitieType extends Basic8BaseDataModel {
  id?: string;
  amenitieListingAmenitieRelation?: RelationType<ListingAmenitieType>;
  name?: string;
  description?: string;
}
export interface AgentProfileType extends Basic8BaseDataModel {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  streetaddress?: string;
  notes?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  logo?: FileType;
  avatar?: FileType;
  agent?: AgentType;
  AND?: UserFilterType[];
  OR?: UserFilterType[];
}
export interface ListingFilterType extends BasicFilterType {
  email?: StringPredicateType;
  firstname?: StringPredicateType;
  lastname?: StringPredicateType;
  phone?: StringPredicateType;
  propertyType?: StringPredicateType;
  sqFootageMax?: IntPredicateType;
  sqFootageMin?: IntPredicateType;
  budgetMax?: IntPredicateType;
  budgetMin?: IntPredicateType;
  bedrooms?: IntPredicateType;
  bathrooms?: IntPredicateType;
  stories?: IntPredicateType;
  notes?: StringPredicateType;
  visibility?: StringPredicateType;
  agent?: AgentFilterType;
  listingZipCodeRelation?: RelationFilter<ListingZipcodeFilterType>;
  listingAmenitieListingRelation?: RelationFilter<ListingAmenitieFilterType>;
  AND?: ListingFilterType[];
  OR?: ListingFilterType[];
}

export interface AgentFilterType extends BasicFilterType {
  user?: UserFilterType;
  role?: StringPredicateType;
  status?: StringPredicateType;
  expirationDate?: StringPredicateType;
  license?: StringPredicateType;
  profile?: AgentProfileFilterType;
  agentListingRelation?: RelationFilter<ListingFilterType>;
  brokerage?: BrokerageFilterType;
  AND?: AgentFilterType[];
  OR?: AgentFilterType[];
}
export interface UserFilterType extends BasicFilterType {
  email?: StringPredicateType;
  firstname?: StringPredicateType;
  lastname?: StringPredicateType;
  gender?: StringPredicateType;
  phoneNumber?: StringPredicateType;
  language?: StringPredicateType;
  timezone?: StringPredicateType;
  birthDate?: DateTimePredicateType;
  roles?: RelationFilter<RoleFilterType>;
  avatar?: FileFilterType;
  userAgentRelation?: RelationFilter<AgentFilterType>;
  AND?: UserFilterType[];
  OR?: UserFilterType[];
}
export interface AgentProfileFilterType extends BasicFilterType {
  email?: StringPredicateType;
  firstname?: StringPredicateType;
  lastname?: StringPredicateType;
  streetaddress?: StringPredicateType;
  notes?: StringPredicateType;
  city?: StringPredicateType;
  state?: StringPredicateType;
  zipcode?: StringPredicateType;
  phone?: StringPredicateType;
  logo?: FileFilterType;
  avatar?: FileFilterType;
  agent?: RelationFilter<AgentFilterType>;
  AND?: UserFilterType[];
  OR?: UserFilterType[];
}
export interface RoleFilterType extends BasicFilterType {
  name?: StringPredicateType;
}
export interface FileFilterType extends BasicFilterType {
  fileId?: StringPredicateType;
  filename?: StringPredicateType;
  downloadUrl?: StringPredicateType;
  mimetype?: StringPredicateType;
  meta?: MetaJsonType;
  shareUrl?: StringPredicateType;
  public?: BoolPredicateType;
  uploaded?: BoolPredicateType;
}
export interface BrokerageFilterType extends BasicFilterType {
  name?: StringPredicateType;
  license?: StringPredicateType;
  brokerageAgentRelation?: RelationFilter<AgentFilterType>;
  AND?: BrokerageFilterType[];
  OR?: BrokerageFilterType[];
}
export interface ListingAmenitieFilterType extends BasicFilterType {
  listing?: ListingFilterType;
  amenitie?: AmenitieFilterType;
  niceToHave?: BoolPredicateType;
  mustToHave?: BoolPredicateType;
}
export interface AmenitieFilterType extends BasicFilterType {
  amenitieListingAmenitieRelation?: RelationFilter<ListingAmenitieFilterType>;
  name?: StringPredicateType;
  description?: StringPredicateType;
  AND?: AmenitieFilterType[];
  OR?: AmenitieFilterType[];
}

export interface ListingZipcodeType extends Basic8BaseDataModel {
  id?: string;
  listing?: RelationType<ListingType>;
  zipcode?: string;
}
export interface ListingZipcodeFilterType extends BasicFilterType {
  listing?: RelationFilter<ListingFilterType>;
  zipcode?: StringPredicateType;
}

export interface NotificationsType extends Basic8BaseDataModel {
  isRead?: boolean;
  message?: string;
  user?: UserType;
  type?: string;
}

// Create Input

export interface ListingCreateInputType {
  firstname?: string;
  lastname?: string;
  propertyType?: string;
  email?: string;
  phone?: string;
  bathrooms?: number;
  bedrooms?: number;
  stories?: number;
  sqFootageMax?: number;
  sqFootageMin?: number;
  budgetMax?: number;
  budgetMin?: number;
  notes?: string;
  agent?: {
    connect?: KeyFilterType;
  };
  listingAmenitieListingRelation?: {
    create: {
      amenitie?: {
        connect?: KeyFilterType;
      };
      niceToHave?: boolean;
      mustToHave?: boolean;
    }[];
  };
  listingZipCodeRelation?: {
    create: ListingZipcodeType[];
  };
}

/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
};

export type AddressDto = {
  __typename?: 'AddressDto';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<CustomerDto>;
  id: Scalars['Int']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type AddressDtoFilterInput = {
  addressLine1?: InputMaybe<StringOperationFilterInput>;
  addressLine2?: InputMaybe<StringOperationFilterInput>;
  addressType?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AddressDtoFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  customer?: InputMaybe<CustomerDtoFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AddressDtoFilterInput>>;
  postalCode?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
};

export type AddressDtoSortInput = {
  addressLine1?: InputMaybe<SortEnumType>;
  addressLine2?: InputMaybe<SortEnumType>;
  addressType?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  id?: InputMaybe<SortEnumType>;
  postalCode?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
};

export type AddressMutationResolvers = {
  __typename?: 'AddressMutationResolvers';
  createAddress: AddressDto;
  deleteAddress: Scalars['Boolean']['output'];
  updateAddress?: Maybe<AddressDto>;
};


export type AddressMutationResolversCreateAddressArgs = {
  input: CreateAddressInput;
};


export type AddressMutationResolversDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type AddressMutationResolversUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};

export type AddressQueryResolvers = {
  __typename?: 'AddressQueryResolvers';
  addressById?: Maybe<AddressDto>;
  addresses?: Maybe<AddressesCollectionSegment>;
  customer?: Maybe<CustomerDto>;
};


export type AddressQueryResolversAddressByIdArgs = {
  id: Scalars['Int']['input'];
};


export type AddressQueryResolversAddressesArgs = {
  order?: InputMaybe<Array<AddressDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AddressDtoFilterInput>;
};

/** A segment of a collection. */
export type AddressesCollectionSegment = {
  __typename?: 'AddressesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<AddressDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BranchDto = {
  __typename?: 'BranchDto';
  id: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type BranchDtoFilterInput = {
  and?: InputMaybe<Array<BranchDtoFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BranchDtoFilterInput>>;
  phone?: InputMaybe<StringOperationFilterInput>;
};

export type BranchDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phone?: InputMaybe<SortEnumType>;
};

export type BranchMutationResolvers = {
  __typename?: 'BranchMutationResolvers';
  createBranch: BranchDto;
  deleteBranch: Scalars['Boolean']['output'];
  updateBranch?: Maybe<BranchDto>;
};


export type BranchMutationResolversCreateBranchArgs = {
  input: CreateBranchInput;
};


export type BranchMutationResolversDeleteBranchArgs = {
  id: Scalars['Int']['input'];
};


export type BranchMutationResolversUpdateBranchArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBranchInput;
};

export type BranchQueryResolvers = {
  __typename?: 'BranchQueryResolvers';
  branchById?: Maybe<BranchDto>;
  branches?: Maybe<BranchesCollectionSegment>;
  createBranch: BranchDto;
};


export type BranchQueryResolversBranchByIdArgs = {
  id: Scalars['Int']['input'];
};


export type BranchQueryResolversBranchesArgs = {
  order?: InputMaybe<Array<BranchDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BranchDtoFilterInput>;
};


export type BranchQueryResolversCreateBranchArgs = {
  input: CreateBranchInput;
};

/** A segment of a collection. */
export type BranchesCollectionSegment = {
  __typename?: 'BranchesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<BranchDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CreateAddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  customerId: Scalars['Int']['input'];
  postalCode: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBranchInput = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateFactorInput = {
  branchId: Scalars['Int']['input'];
  customerId: Scalars['Int']['input'];
  deliveryAddressId: Scalars['Int']['input'];
  orders: Array<CreateFactorOrderInput>;
  paymentMethod: PaymentMethods;
  totalAmount: Scalars['Decimal']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateFactorOrderInput = {
  count: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRoles;
  username: Scalars['String']['input'];
};

export type CustomerDto = {
  __typename?: 'CustomerDto';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CustomerDtoFilterInput = {
  and?: InputMaybe<Array<CustomerDtoFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerDtoFilterInput>>;
  phone?: InputMaybe<StringOperationFilterInput>;
};

export type CustomerDtoSortInput = {
  email?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  phone?: InputMaybe<SortEnumType>;
};

export type CustomerMutationResolvers = {
  __typename?: 'CustomerMutationResolvers';
  createCustomer: CustomerDto;
  deleteCustomer: Scalars['Boolean']['output'];
  updateCustomer?: Maybe<CustomerDto>;
};


export type CustomerMutationResolversCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type CustomerMutationResolversDeleteCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type CustomerMutationResolversUpdateCustomerArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCustomerInput;
};

export type CustomerQueryResolvers = {
  __typename?: 'CustomerQueryResolvers';
  createCustomer: CustomerDto;
  customerById?: Maybe<CustomerDto>;
  customers?: Maybe<CustomersCollectionSegment>;
};


export type CustomerQueryResolversCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type CustomerQueryResolversCustomerByIdArgs = {
  id: Scalars['Int']['input'];
};


export type CustomerQueryResolversCustomersArgs = {
  order?: InputMaybe<Array<CustomerDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomerDtoFilterInput>;
};

/** A segment of a collection. */
export type CustomersCollectionSegment = {
  __typename?: 'CustomersCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<CustomerDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type FactorDto = {
  __typename?: 'FactorDto';
  branch?: Maybe<BranchDto>;
  customer?: Maybe<CustomerDto>;
  deliveryAddress?: Maybe<AddressDto>;
  factorDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  user?: Maybe<UserDto>;
};

export type FactorDtoFilterInput = {
  and?: InputMaybe<Array<FactorDtoFilterInput>>;
  branch?: InputMaybe<BranchDtoFilterInput>;
  customer?: InputMaybe<CustomerDtoFilterInput>;
  deliveryAddress?: InputMaybe<AddressDtoFilterInput>;
  factorDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<FactorDtoFilterInput>>;
  paymentMethod?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  user?: InputMaybe<UserDtoFilterInput>;
};

export type FactorDtoSortInput = {
  branch?: InputMaybe<BranchDtoSortInput>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  deliveryAddress?: InputMaybe<AddressDtoSortInput>;
  factorDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  paymentMethod?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserDtoSortInput>;
};

export type FactorMutationResolvers = {
  __typename?: 'FactorMutationResolvers';
  createFactor: FactorDto;
};


export type FactorMutationResolversCreateFactorArgs = {
  input: CreateFactorInput;
};

export type FactorQueryResolvers = {
  __typename?: 'FactorQueryResolvers';
  factorById?: Maybe<FactorDto>;
  factores?: Maybe<FactoresCollectionSegment>;
};


export type FactorQueryResolversFactorByIdArgs = {
  id: Scalars['Int']['input'];
};


export type FactorQueryResolversFactoresArgs = {
  order?: InputMaybe<Array<FactorDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FactorDtoFilterInput>;
};

/** A segment of a collection. */
export type FactoresCollectionSegment = {
  __typename?: 'FactoresCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<FactorDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addressesMutation: AddressMutationResolvers;
  branchesMutation: BranchMutationResolvers;
  customersMutation: CustomerMutationResolvers;
  factorsMutation: FactorMutationResolvers;
  usersMutation: UserMutationResolvers;
};

export enum PaymentMethods {
  CardToCard = 'CARD_TO_CARD',
  Cash = 'CASH',
  Check = 'CHECK'
}

export type Query = {
  __typename?: 'Query';
  addressesQuery: AddressQueryResolvers;
  branchesQuery: BranchQueryResolvers;
  customersQuery: CustomerQueryResolvers;
  factorsQuery: FactorQueryResolvers;
  usersQuery: UserQueryResolvers;
};

export type SetUserBranchInput = {
  branchId: Scalars['Int']['input'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAddressInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBranchInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoles>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  branch?: Maybe<BranchDto>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  role: UserRoles;
  username: Scalars['String']['output'];
};

export type UserDtoFilterInput = {
  and?: InputMaybe<Array<UserDtoFilterInput>>;
  branch?: InputMaybe<BranchDtoFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserDtoFilterInput>>;
  role?: InputMaybe<UserRolesOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type UserDtoSortInput = {
  branch?: InputMaybe<BranchDtoSortInput>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  role?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export type UserMutationResolvers = {
  __typename?: 'UserMutationResolvers';
  createUser: UserDto;
  deleteUser: Scalars['Boolean']['output'];
  setUserBranch: Scalars['Boolean']['output'];
  updateUser?: Maybe<UserDto>;
};


export type UserMutationResolversCreateUserArgs = {
  input: CreateUserInput;
};


export type UserMutationResolversDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type UserMutationResolversSetUserBranchArgs = {
  id: Scalars['Int']['input'];
  input: SetUserBranchInput;
};


export type UserMutationResolversUpdateUserArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUserInput;
};

export type UserQueryResolvers = {
  __typename?: 'UserQueryResolvers';
  userBranch?: Maybe<BranchDto>;
  userById?: Maybe<UserDto>;
  users?: Maybe<UsersCollectionSegment>;
  usersByBranch: Array<UserDto>;
};


export type UserQueryResolversUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type UserQueryResolversUsersArgs = {
  order?: InputMaybe<Array<UserDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserDtoFilterInput>;
};


export type UserQueryResolversUsersByBranchArgs = {
  branchId: Scalars['Int']['input'];
};

export enum UserRoles {
  Admin = 'ADMIN',
  Operator = 'OPERATOR'
}

export type UserRolesOperationFilterInput = {
  eq?: InputMaybe<UserRoles>;
  in?: InputMaybe<Array<UserRoles>>;
  neq?: InputMaybe<UserRoles>;
  nin?: InputMaybe<Array<UserRoles>>;
};

/** A segment of a collection. */
export type UsersCollectionSegment = {
  __typename?: 'UsersCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<UserDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type Branch_Query_GetBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type Branch_Query_GetBranchesQuery = { __typename?: 'Query', branchesQuery: { __typename?: 'BranchQueryResolvers', branches?: { __typename?: 'BranchesCollectionSegment', items?: Array<{ __typename?: 'BranchDto', id: number, name: string, phone: string, location: string }> | null } | null } };

export type User_Query_GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type User_Query_GetUsersQuery = { __typename?: 'Query', usersQuery: { __typename?: 'UserQueryResolvers', users?: { __typename?: 'UsersCollectionSegment', items?: Array<{ __typename?: 'UserDto', id: number, username: string, firstName: string, lastName: string, role: UserRoles, isActive: boolean, branch?: { __typename?: 'BranchDto', id: number, name: string } | null }> | null } | null } };

export type User_Query_GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type User_Query_GetUserByIdQuery = { __typename?: 'Query', usersQuery: { __typename?: 'UserQueryResolvers', userById?: { __typename?: 'UserDto', id: number, username: string, firstName: string, lastName: string, role: UserRoles, isActive: boolean, branch?: { __typename?: 'BranchDto', id: number, name: string } | null } | null } };

export type User_Mutation_CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type User_Mutation_CreateUserMutation = { __typename?: 'Mutation', usersMutation: { __typename?: 'UserMutationResolvers', createUser: { __typename?: 'UserDto', id: number, username: string, firstName: string, lastName: string, role: UserRoles, branch?: { __typename?: 'BranchDto', id: number, name: string } | null } } };


export const Branch_Query_GetBranchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Branch_Query_GetBranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branchesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Branch_Query_GetBranchesQuery, Branch_Query_GetBranchesQueryVariables>;
export const User_Query_GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User_Query_GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<User_Query_GetUsersQuery, User_Query_GetUsersQueryVariables>;
export const User_Query_GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User_Query_GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<User_Query_GetUserByIdQuery, User_Query_GetUserByIdQueryVariables>;
export const User_Mutation_CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"User_Mutation_CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<User_Mutation_CreateUserMutation, User_Mutation_CreateUserMutationVariables>;
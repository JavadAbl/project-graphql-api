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
};

export type BranchDto = {
  __typename?: 'BranchDto';
  id: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type CreateUserInput = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserDto;
  deleteUser: Scalars['Boolean']['output'];
  setUserBranch: Scalars['Boolean']['output'];
  updateUser?: Maybe<UserDto>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetUserBranchArgs = {
  id: Scalars['Int']['input'];
  input: SetUserBranchInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  createUser: UserDto;
  userById?: Maybe<UserDto>;
  users: Array<UserDto>;
};


export type QueryCreateUserArgs = {
  input: CreateUserInput;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type SetUserBranchInput = {
  branchId: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  branch?: Maybe<BranchDto>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type User_Query_GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type User_Query_GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserDto', id: number, username: string, firstName: string, lastName: string, role: string, isActive: boolean, branch?: { __typename?: 'BranchDto', id: number, name: string } | null }> };

export type User_Mutation_CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type User_Mutation_CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserDto', id: number, username: string, firstName: string, lastName: string, role: string, branch?: { __typename?: 'BranchDto', id: number, name: string } | null } };


export const User_Query_GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User_Query_GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<User_Query_GetUsersQuery, User_Query_GetUsersQueryVariables>;
export const User_Mutation_CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"User_Mutation_CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<User_Mutation_CreateUserMutation, User_Mutation_CreateUserMutationVariables>;
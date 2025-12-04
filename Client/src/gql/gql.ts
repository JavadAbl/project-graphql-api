/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query Branch_Query_GetBranches {\n  branchesQuery {\n    branches {\n      items {\n        id\n        name\n        phone\n        location\n      }\n    }\n  }\n}": typeof types.Branch_Query_GetBranchesDocument,
    "query User_Query_GetUsers {\n  usersQuery {\n    users {\n      items {\n        id\n        username\n        firstName\n        lastName\n        role\n        isActive\n        branch {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nquery User_Query_GetUserById($id: Int!) {\n  usersQuery {\n    userById(id: $id) {\n      id\n      username\n      firstName\n      lastName\n      role\n      isActive\n      branch {\n        id\n        name\n      }\n    }\n  }\n}\n\nmutation User_Mutation_CreateUser($input: CreateUserInput!) {\n  usersMutation {\n    createUser(input: $input) {\n      id\n      username\n      firstName\n      lastName\n      role\n      branch {\n        id\n        name\n      }\n    }\n  }\n}": typeof types.User_Query_GetUsersDocument,
};
const documents: Documents = {
    "query Branch_Query_GetBranches {\n  branchesQuery {\n    branches {\n      items {\n        id\n        name\n        phone\n        location\n      }\n    }\n  }\n}": types.Branch_Query_GetBranchesDocument,
    "query User_Query_GetUsers {\n  usersQuery {\n    users {\n      items {\n        id\n        username\n        firstName\n        lastName\n        role\n        isActive\n        branch {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nquery User_Query_GetUserById($id: Int!) {\n  usersQuery {\n    userById(id: $id) {\n      id\n      username\n      firstName\n      lastName\n      role\n      isActive\n      branch {\n        id\n        name\n      }\n    }\n  }\n}\n\nmutation User_Mutation_CreateUser($input: CreateUserInput!) {\n  usersMutation {\n    createUser(input: $input) {\n      id\n      username\n      firstName\n      lastName\n      role\n      branch {\n        id\n        name\n      }\n    }\n  }\n}": types.User_Query_GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Branch_Query_GetBranches {\n  branchesQuery {\n    branches {\n      items {\n        id\n        name\n        phone\n        location\n      }\n    }\n  }\n}"): (typeof documents)["query Branch_Query_GetBranches {\n  branchesQuery {\n    branches {\n      items {\n        id\n        name\n        phone\n        location\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User_Query_GetUsers {\n  usersQuery {\n    users {\n      items {\n        id\n        username\n        firstName\n        lastName\n        role\n        isActive\n        branch {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nquery User_Query_GetUserById($id: Int!) {\n  usersQuery {\n    userById(id: $id) {\n      id\n      username\n      firstName\n      lastName\n      role\n      isActive\n      branch {\n        id\n        name\n      }\n    }\n  }\n}\n\nmutation User_Mutation_CreateUser($input: CreateUserInput!) {\n  usersMutation {\n    createUser(input: $input) {\n      id\n      username\n      firstName\n      lastName\n      role\n      branch {\n        id\n        name\n      }\n    }\n  }\n}"): (typeof documents)["query User_Query_GetUsers {\n  usersQuery {\n    users {\n      items {\n        id\n        username\n        firstName\n        lastName\n        role\n        isActive\n        branch {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nquery User_Query_GetUserById($id: Int!) {\n  usersQuery {\n    userById(id: $id) {\n      id\n      username\n      firstName\n      lastName\n      role\n      isActive\n      branch {\n        id\n        name\n      }\n    }\n  }\n}\n\nmutation User_Mutation_CreateUser($input: CreateUserInput!) {\n  usersMutation {\n    createUser(input: $input) {\n      id\n      username\n      firstName\n      lastName\n      role\n      branch {\n        id\n        name\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
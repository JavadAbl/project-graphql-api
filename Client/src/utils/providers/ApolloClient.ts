import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "sonner";

// Error interceptor
const errorLink = onError(({ graphQLErrors, networkError, operation,error }) => {

    if (error)
        toast.error(error.message);

    if (graphQLErrors) {
        graphQLErrors.forEach((err) =>
            toast.error(`[GraphQL error]:, ${
                {
                    message: err.message,
                    path: err.path,
                    locations: err.locations,
                    operation: operation.operationName
}
            }`)
            /*console.error(`[GraphQL error]:`, {
                message: err.message,
                path: err.path,
                locations: err.locations,
                operation: operation.operationName,
            })*/
        );
    }

    if (networkError) {
        console.error(`[Network error]:`, networkError);
    }
});

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

// Complete Apollo Client
export const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),  // Like Axios interceptor chain
    cache: new InMemoryCache(),
});

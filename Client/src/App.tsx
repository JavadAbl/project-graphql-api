import { BrowserRouter } from "react-router";
import { Toaster } from "sonner@2.0.3";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-center" richColors dir="rtl" />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

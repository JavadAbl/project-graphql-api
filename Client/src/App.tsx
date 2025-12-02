import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./utils/providers/ApolloClient";



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

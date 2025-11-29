import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Login } from "../pages/Login";
import { Branches } from "../pages/Branches";
import { BranchForm } from "../pages/BranchForm";
import { CustomerForm } from "../pages/CustomerForm";
import { Customers } from "../pages/Customers";
import { Dashboard } from "../pages/Dashboard";
import { FactorDetail } from "../pages/FactorDetail";
import { FactorForm } from "../pages/FactorForm";
import { Factors } from "../pages/Factors";
import { ProductForm } from "../pages/ProductForm";
import { Products } from "../pages/Products";
import { UserForm } from "../pages/UserForm";
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "./Layout";
import { Users } from "../pages/Users";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Layout>
              <Customers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/new"
        element={
          <ProtectedRoute>
            <Layout>
              <CustomerForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CustomerForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/factors"
        element={
          <ProtectedRoute>
            <Layout>
              <Factors />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/factors/new"
        element={
          <ProtectedRoute>
            <Layout>
              <FactorForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/factors/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <FactorDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <ProductForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <ProductForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/branches"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <Branches />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/branches/new"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <BranchForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/branches/:id"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <BranchForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/new"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <UserForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute requireManager>
            <Layout>
              <UserForm />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

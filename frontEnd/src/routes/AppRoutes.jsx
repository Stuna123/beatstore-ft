import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Products from '../pages/Products' 
import ProductDetails from "../pages/ProductDetails"
import Cart from '../pages/Cart'

import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword  from "../pages/ForgotPassword"

import ResetPassword from "../pages/ResetPassword"

import AdminDashboard from "../pages/AdminDashboard"

import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"

import Success from "../pages/Success"
import Cancel from "../pages/Cancel"

// import PrivateRouteUser from "../components/PrivateRouteUser"
import Dashboard from "../pages/Dashboard"
import PageNotFound from "../pages/PageNotFound"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element= {<PageNotFound />} />

        <Route path="/cart" element={ 
            <PrivateRoute>
                <Cart />
            </PrivateRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        <Route path="/admin" element={ 
            <AdminRoute>
                <AdminDashboard />
            </AdminRoute>
        } />

        <Route 
            path="/dashboard"
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }
        />

    </Routes>
  )
}

export default AppRoutes;

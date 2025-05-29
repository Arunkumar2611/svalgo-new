import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import CollectorDashboard from '../pages/CollectorDashboard/CollectorDashboard';
import Customers from '../pages/Customers/Customers';
import Invoices from '../pages/Invoices/Invoices';
import Payments from '../pages/Payments/Payments';
import Collections from '../pages/Collections/Collections';
import Claims from '../pages/Claims/Claims';
import CustomerOrder from '../pages/CustomerOrder/CustomerOrder';
import DocumentCentral from '../pages/DocumentCentral/DocumentCentral';
import Reports from '../pages/Reports/Reports';
import SmartAssistant from '../pages/Assistant/SmartAssistant';
import TaskManager from "../pages/TaskManager/TaskManager";
import Accounts from "../pages/Accounts/Accounts";

const Routes = () => {

    const publicRoutes = () => {
        return [
            { path: "/login", element: <h1>Login Routes</h1> },
            { path: "/signUp", element: <h1>SignUp Routes</h1> },
            { path: "/thank-you", element: <h1>ThankYou Routes</h1> },
            { path: "/verification", element: <h1>Verification Routes</h1> },
            { path: "/forgotPassword", element: <h1>ForgotPassword Routes</h1> },
            { path: "/createpassword", element: <h1>CreatePassword Routes</h1> },
            { path: "/invalid-link", element: <h1>InvalidToken Routes</h1> },
            { path: "/privacy-policy", element: <h1>PrivacyPolicy Routes</h1> },
            { path: "/security", element: <h1>Security Routes</h1> },
            { path: "/terms", element: <h1>TermsAndConds Routes</h1> },
            { path: "/main-services-agreement", element: <h1>MainServicesAgreement Routes</h1> },
            { path: "*", element: <Navigate to="/login" replace /> },
        ];
    };

    const privateRoutes = () => {
        return {
            element: (
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Layout />
                </Suspense>
            ),
            children: [
                { path: '/', element: <Dashboard /> },
                { path: '/task-manager', element: <TaskManager /> },
                { path: '/collector-dashboard', element: <CollectorDashboard /> },
                { path: '/customers', element: <Customers /> },
                { path: '/accounts', element: <Accounts /> },
                { path: '/invoices', element: <Invoices /> },
                { path: '/payments', element: <Payments /> },
                { path: '/collections', element: <Collections /> },
                { path: '/claims', element: <Claims /> },
                { path: '/customerOrder', element: <CustomerOrder /> },
                { path: '/document-central', element: <DocumentCentral /> },
                { path: '/reports', element: <Reports /> },
                { path: '/assistant', element: <SmartAssistant /> },
                { path: '*', element: <Navigate to="/" replace /> },
              ],
        };
    };

    const isAuthenticated = true;

    const router = createBrowserRouter([
        ...publicRoutes(),
        ...(isAuthenticated ? [privateRoutes()] : []),
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default Routes;
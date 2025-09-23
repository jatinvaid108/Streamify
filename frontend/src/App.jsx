import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Layout from "./components/Layout.jsx";

import axios from "axios";
import PageLoader from './components/PageLoader.jsx';
import { useThemeStore } from "./store/useThemeStore.js";

import useAuthUser from './hooks/useAuthUser.js';

const App = () => {
  //tanstack query in below hook
  const {isLoading, authUser}=useAuthUser();  //Calling hook we created an will give two values---> This was the imp logic which needed to called in most pages signup login so we created hook // Assume we want to use authUser in Onboarding just call this hook--->authUser is return as object 
  const { theme } = useThemeStore();
  const isAuthenticated=Boolean(authUser);
  const isOnboarded= authUser?.isOnboarded
  if(isLoading) return <PageLoader/>;


  return( 
    <div className="h-screen" data-theme={theme}>
    <Routes>
      <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
      <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

      <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      <Route path="/call" element={isAuthenticated ? <CallPage />: <Navigate to="/login"/>} />
      <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        
      <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
    </Routes>

    <Toaster/>
  </div>
);
}

export default App;

import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import PageLoader from "./components/PageLoader"

// Eager loading - Hemen gerekli
import Login from "./pages/Login"
import Register from "./pages/Register"

// Lazy loading - Sayfa açılınca yüklenecek
const LandingPage = lazy(() => import("./pages/LandingPage"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Calendar = lazy(() => import("./pages/Calendar"))
const Waitlist = lazy(() => import("./pages/Waitlist"))
const Appointments = lazy(() => import("./pages/Appointments"))
const Chat = lazy(() => import("./pages/Chat"))

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>

            <Route path="/" element={<LandingPage />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/waitlist" 
              element={
                <ProtectedRoute vetOnly>
                  <Waitlist />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />

          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

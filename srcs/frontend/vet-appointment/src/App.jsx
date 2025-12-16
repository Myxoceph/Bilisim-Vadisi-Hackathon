import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Calendar from "./pages/Calendar"
import Waitlist from "./pages/Waitlist"
import Appointments from "./pages/Appointments"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<Layout />}>

          <Route index element={<LandingPage />} />
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="chat" element={<Chat />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Calendar from "./pages/Calendar"
import Waitlist from "./pages/Waitlist"
import Appointments from "./pages/Appointments"
import Chat from "./pages/Chat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
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

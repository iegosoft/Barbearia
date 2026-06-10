import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Editar from './pages/Editar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/painel" element={
          <ProtectedRoute><Admin /></ProtectedRoute>
        } />
        <Route path="/admin/editar/:id" element={
          <ProtectedRoute><Editar /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

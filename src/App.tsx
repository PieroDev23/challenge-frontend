import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages'
import { RegisterPage } from './pages/auth/Register'
import { DashboardPage } from './pages/protected/Dashboard'
import { ProtectedRoutes } from './pages/protected'

function App() {

  return (
    <Routes>
      <Route path='/' index element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default App

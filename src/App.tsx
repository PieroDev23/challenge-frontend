import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages'
import { RegisterPage } from './pages/auth/Register'

function App() {

  return (
    <Routes>
      <Route path='/' index element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}

export default App

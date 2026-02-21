import React from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'   // ✅ add Route
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurentUser } from './services/api'
import { useDispatch, useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
import Notes from './pages/Notes'
import Pricing from './pages/Pricing'
import History from './pages/History'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailer from './pages/PaymentFailer'
export const serverUrl="http://localhost:5000"

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    getCurentUser(dispatch)
  },[dispatch])
  const {userData}=useSelector((state)=>state.user)
  console.log(userData)
  return (
    <>
      <Routes>
        <Route path='/' element={ userData ? <Home /> : <Navigate to="/auth" replace/> } />
        <Route path='/auth' element={userData ? <Navigate to="/" replace/> : <Auth />} />
        <Route path='/history' element={ userData ? <History /> : <Navigate to="/auth" replace/> } />
        <Route path='/notes' element={ userData ? <Notes /> : <Navigate to="/auth" replace/> } />
        <Route path='/pricing' element={ userData ? <Pricing /> : <Navigate to="/auth" replace/> } />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-failed' element={<PaymentFailer />} />
      </Routes>
    </>
  )
}

export default App

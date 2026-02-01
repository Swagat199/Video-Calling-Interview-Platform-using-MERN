import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage' 
import DashboarPage from './pages/DashboardPage'
import { Toaster } from 'react-hot-toast'

function App() {
  
  const {isSignedIn,isLoaded} = useUser();

  //this avoids flickering effect
  if (!isLoaded) return null;

  return (
    <><Routes>
      <Route path="/" element={!isSignedIn ? <HomePage/> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isSignedIn ? <DashboarPage/> : <Navigate to={"/"} />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"} />} />
    </Routes>

    <Toaster position='bottom' toastDuration={4000}/>
    </> 
    
  )
}

export default App

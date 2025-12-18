import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import './App.css'

function App() {
  
  return (
    <>
     <h1>Video Calling Interview Platform</h1>

    <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn>
        <SignOutButton/>
        <UserButton />
        <p>Welcome to the platform! You are signed in.</p>
      </SignedIn>
    </>
  )
}

export default App

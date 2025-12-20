import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'


function HomePage() {
  return (
    <div>
        <button className='btn btn-primary' onClick={()=> toast.error("This is a success message")}>Click Me</button>

        <SignedOut>
            <SignInButton mode="modal">
                <button className='btn btn-secondary mt-4'>Log in</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignOutButton></SignOutButton>
        </SignedIn>

        <UserButton/>
    </div>
  )
}

export default HomePage
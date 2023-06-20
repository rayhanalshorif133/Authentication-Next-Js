import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
export default function index() {

  const { data: session } = useSession()





  return (
    <>
      {session? AuthUser({session}): Guest()}
    </>
  )
}



function Guest(){
  return(
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Guest Home page
      </h3>

      <div className='flex justify-center mt-10'>
        <Link href={'/auth/login'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Login
        </Link>
        
      </div>
    </main>
  )
}

function AuthUser({session}){

  const handleSignOut = () => {
    signOut('google', {
      callbackUrl: 'http://localhost:3000/auth/login'
    });
  }
  return(
    <main className='container mx-auto text-center py-20'>
    <h2 className="text-4xl font-bold dark:text-white">Heading 2</h2>
      <h3 className='text-4xl font-bold'>
        Auth User Home page
      </h3>

      <div className='details'>
        <h4 className='text-3xl font-bold'>
          User Name : {session.user.name}
        </h4>
        <h5 className='text-xl font-bold'>
          User Email : {session.user.email}
        </h5>
      </div>
      <div className='flex justify-center mt-10'>
        <button onClick={handleSignOut} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
            Sign Out
        </button>
      </div>

      <div className='flex justify-center mt-10'>
        <Link href={'/profile'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Go to Profile
        </Link>
      </div>
    </main>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  if(!session){
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

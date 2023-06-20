import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function profile() {

    const { data: session } = useSession();


  

    return (
        <div className="container mx-auto pt-4 ">
            <div className="max-w-sm rounded overflow-hidden justify-center mx-auto shadow-lg">
                <img className="w-full" width={40} height={40} src={session?.user.image} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{session?.user.name}</div>
                    <div className="font-bold text-xl mb-2">{session?.user.email}</div>
                </div>
                <div className="px-6 py-4">
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <Link href={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Home
                        </Link>
                    </span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

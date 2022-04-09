import Link from "next/link"
import { CollectionIcon, HomeIcon, LogoutIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'
import apiAxios from "../lib/axios"
import { useRouter } from 'next/router'


const Navbar = () => {
    const router = useRouter()
    async function logout() {
        await apiAxios.get('/auth/logout', { withCredentials: true })
        router.push('/login')
    }

    return (
        <div className="flex h-14 w-screen justify-between items-center bg-secondary-dark px-5 absolute top-0 right-0">
            {/* Logo */ }
            <div className="flex justify-center">

                <Link href="/">
                    <a className="text-offwhite-50 font-mono text-3xl font-bold sm:hidden">PH</a>
                </Link>
                <Link href="/">
                    <a className="text-offwhite-50 font-mono text-3xl font-bold hidden sm:block">POSTHUB</a>
                </Link>
            </div>

            {/* Middle area */ }
            <div className="flex justify-center space-x-1 md:space-x-3">
                <div className="text-offwhite-100 cursor-pointer hover:bg-tertiary-dark px-1 md:px-3 py-1 rounded-lg">
                    <HomeIcon className="w-10 h-10" />
                </div>
                <div className="text-offwhite-100 cursor-pointer hover:bg-tertiary-dark px-3 py-1 rounded-lg">
                    <CollectionIcon className="w-10 h-10" />
                </div>
            </div>

            {/* Right area */ }
            <div className="flex space-x-2">
                <div className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer flex justify-center items-center">
                    <UserIcon className="w-7 h-7" />
                </div>
                <div onClick={ logout } className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer justify-center items-center">
                    <LogoutIcon className="w-7 h-7" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
import Link from "next/link"
import { DocumentAddIcon, HomeIcon, LogoutIcon } from '@heroicons/react/outline'
import { DocumentAddIcon as SolidDocumentAddIcon, HomeIcon as SolidHomeIcon, LogoutIcon as SolidLogoutIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/solid'
import clientAxios from "../lib/axios"
import { useRouter } from 'next/router'
import nprogress from "nprogress"
import { toast } from "react-toastify"
import Image from 'next/image'
const Navbar = ({ user }) => {
    const router = useRouter()
    async function logout() {
        nprogress.start()
        await clientAxios.get('/api/auth/logout', { withCredentials: true })
        nprogress.done()
        router.push('/login')
        toast.success("Logged out successfully", { delay: 1000 })
    }

    return (
        <div className="flex z-20 shadow-md shadow-primary-dark h-14 w-full justify-between items-center bg-secondary-dark px-5 sticky top-0 right-0">
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
                    <Link href="/">
                        { router.route === '/' ? <SolidHomeIcon className="w-10 h-10" /> : <HomeIcon className="w-10 h-10" /> }
                    </Link>
                </div>
                <div className="text-offwhite-100 cursor-pointer hover:bg-tertiary-dark px-3 py-1 rounded-lg">
                    <Link href="/post/new">
                        { router.route === '/post/new' ? <SolidDocumentAddIcon className="w-10 h-10" /> : <DocumentAddIcon className="w-10 h-10" /> }
                    </Link>
                </div>
            </div>

            {/* Right area */ }
            <div className="flex space-x-2">
                <div onClick={ () => {
                    toast("IT WORKS")

                } } className="text-offwhite-50 hidden sm:flex hover:brightness-105 bg-tertiary-dark pl-1 pr-3 rounded-3xl cursor-pointer justify-center items-center">
                    <div className="text-offwhite-50 hover:brightness-110 bg-tertiary-dark p-1 rounded-3xl cursor-pointer flex justify-center items-center">
                        <div className="relative p-2 bg-primary-dark h-8 w-8 rounded-full overflow-hidden">
                            <Image src='https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' layout="fill" />
                        </div>
                    </div>
                    <p>{ user.username }</p>

                </div>

                <div onClick={ () => {
                    toast("IT WORKS")
                } } className="text-offwhite-50 sm:hidden hover:brightness-110 overflow-hidden cursor-pointer flex justify-center items-center">
                    <div className="relative p-2 bg-primary-dark h-10 w-10 rounded-full overflow-hidden">
                        <Image src='https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' layout="fill" />
                    </div>
                </div>


                <div onClick={ logout } className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer justify-center items-center">
                    <LogoutIcon className="w-7 h-7" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
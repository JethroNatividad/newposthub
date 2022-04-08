import Link from "next/link"
import { CollectionIcon, HomeIcon, LogoutIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'

const Navbar = () => {
    return (
        <div className="flex h-14 justify-between items-center bg-secondary-dark">
            {/* Logo */ }
            <div className="flex justify-center">

                <Link href="/" >POSTHUB</Link>
            </div>

            {/* Middle area */ }
            <div className="flex justify-center space-x-3">
                <div className="text-offwhite-100 cursor-pointer hover:bg-tertiary-dark px-3 py-1">
                    <HomeIcon className="w-10 h-10" />
                </div>
                <div className="text-offwhite-100 cursor-pointer hover:bg-tertiary-dark px-3 py-1">
                    <CollectionIcon className="w-10 h-10" />
                </div>
            </div>

            {/* Right area */ }
            <div className="flex space-x-2">
                <div className="text-offwhite-50">
                    <UserIcon className="w-10 h-10" />
                </div>
                <div>
                    <LogoutIcon className="w-10 h-10" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
import { DotsHorizontalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { useState, useRef, useEffect } from 'react'


const DotsMenu = () => {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && isOpen) {
                setIsOpen(false)
                console.log("clicked outside")
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, isOpen])


    return (
        <div ref={ ref } className='relative text-center'>
            <div onClick={ () => setIsOpen(!isOpen) } className="text-offwhite-100 h-5 flex items-center px-1 cursor-pointer hover:bg-tertiary-dark  rounded-lg">
                <DotsHorizontalIcon className="w-6 h-6 relative" />
            </div>
            <div className={ `${isOpen ? "opacity-100" : "opacity-0"} max-w-[6rem] px-1 py-1 space-y-2 w-96 absolute overflow-hidden transition-all ease-in top-5 left-[-200%] z-10 bg-tertiary-dark rounded-lg shadow-lg` }>
                <button className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-orange-400' type="submit"><PencilAltIcon className="w-6 h-6 relative" /></button>
                <button className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-red-600' type="submit"><TrashIcon className="w-6 h-6 relative" /></button>


            </div>
        </div>
    )
}

export default DotsMenu
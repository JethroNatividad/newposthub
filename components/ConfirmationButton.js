import { CheckIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import { useState, useRef, useEffect } from 'react'

const ConfirmationButton = () => {
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

    const handleConfirm = () => {
        setIsOpen(false)
        console.log("confirmed")
    }
    const handleCancel = () => {
        setIsOpen(false)
        console.log("cancelled")
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    return (
        <div ref={ ref }>
            { !isOpen ? (
                <button onClick={ handleOpen } className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-red-600  '>
                    <TrashIcon className="w-6 h-6 relative" />
                </button>
            ) : <div className='flex space-x-1'>
                <button onClick={ handleConfirm } className='px-1 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-green-600 bg-primary-dark max-w-xs'><CheckIcon className="w-6 h-6 relative" /></button>
                <button onClick={ handleCancel } className='px-1 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-red-600 bg-primary-dark max-w-xs'><XIcon className="w-6 h-6 relative" /></button>
            </div> }

        </div>
    )
}

export default ConfirmationButton
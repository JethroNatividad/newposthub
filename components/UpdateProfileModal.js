import { useEffect, useRef } from 'react'

const UpdateProfileModal = ({ isOpen, setIsOpen }) => {
    const ref = useRef(null)
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        console.log('Confirmation button')
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
        <div ref={ ref } className={ `${isOpen ? 'flex' : 'hidden'} w-full max-w-3xl h-96 fixed top-13 mx-auto left-0 right-0 z-30 bg-tertiary-dark` }>UpdateProfileModal</div>
    )
}

export default UpdateProfileModal
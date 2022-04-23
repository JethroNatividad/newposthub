import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const Images = ({ images, countFrom = 5 }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [photoIndex, setphotoIndex] = useState(0)

    // const imagesToShow = images
    // if (countFrom && images.length > countFrom) {
    //     imagesToShow.length = countFrom
    // }

    // If we have two pictures, those should be equally divided into two columns
    // For three pictures, there should be one in a row and two pictures in columns in another row.
    // For four pictures, there should be one in a row and three pictures in columns in another row.
    // For five pictures, two in the first row, three in the second row
    // For more than five, it should display an overlay presenting the counts of additional images

    const handleOpen = (index) => {
        setphotoIndex(index)
        setIsOpen(true)
    }
    const renderOneImage = () => {
        return (
            <div className='grid grid-cols-1 h-[576px]'>
                <div onClick={ () => handleOpen(0) } className='relative h-full cursor-pointer'>
                    <Image className='object-contain' src={ images[0] } layout="fill" alt="img" />
                </div>
            </div>)
    }



    return (
        <div className='w-full shadow-sm shadow-tertiary-dark'>
            { renderOneImage() }
            { isOpen && (
                <Lightbox
                    onImageLoad={ () => console.log('Image loaded') }
                    mainSrc={ images[photoIndex] }
                    nextSrc={ images[(photoIndex + 1) % images.length] }
                    prevSrc={ images[(photoIndex + images.length - 1) % images.length] }
                    onCloseRequest={ () => setIsOpen(false) }
                    onMovePrevRequest={ () =>
                        setphotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={ () =>
                        setphotoIndex((photoIndex + 1) % images.length)

                    }
                />
            ) }
        </div>
    )
}

export default Images
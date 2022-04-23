import Image from 'next/image'
import { useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

const Images = ({ images, countFrom = 5 }) => {
    const [isOpen, setIsOpen] = useState(true)

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
            <Gallery>
                <div className='grid grid-cols-1 h-[576px]'>
                    <Item
                        original={ images[0] }
                        width={ 1280 }
                        height={ 720 }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                <Image className='object-contain' src={ images[0] } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                </div>
            </Gallery>
        )
    }



    return (
        <div className='w-full shadow-sm shadow-tertiary-dark'>
            { renderOneImage() }

        </div>
    )
}

export default Images
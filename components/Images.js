import Image from 'next/image'
import React from 'react'

const Images = ({ images, countFrom = 5 }) => {
    // const imagesToShow = images
    // if (countFrom && images.length > countFrom) {
    //     imagesToShow.length = countFrom
    // }

    // If we have two pictures, those should be equally divided into two columns
    // For three pictures, there should be one in a row and two pictures in columns in another row.
    // For four pictures, there should be one in a row and three pictures in columns in another row.
    // For five pictures, two in the first row, three in the second row
    // For more than five, it should display an overlay presenting the counts of additional images


    const renderOneImage = () => {
        return (
            <div className='grid grid-cols-1 h-[576px]'>
                <div className='relative h-full '>
                    <Image className='object-contain' src={ images[0] } layout="fill" alt="img" />
                </div>
            </div>)
    }


    return (
        <div className='w-full shadow-sm shadow-tertiary-dark'>
            { renderOneImage() }

            {/* { images.map(image => <p>{ image }</p>) } */ }
        </div>
    )
}

export default Images
import Image from 'next/image'
import React from 'react'

const Images = ({ images, countFrom = 5 }) => {
    const imagesToShow = [...images]
    if (countFrom && images.length > countFrom) {
        imagesToShow.length = countFrom
    }

    // If we have two pictures, those should be equally divided into two columns
    // For three pictures, there should be one in a row and two pictures in columns in another row.
    // For four pictures, there should be one in a row and three pictures in columns in another row.
    // For five pictures, two in the first row, three in the second row
    // For more than five, it should display an overlay presenting the counts of additional images


    const renderOneImage = () => {
        return <div >
            <Image src={ images[0] } layout="fill" />
        </div>
    }


    return (
        <div>
            { renderOneImage() }
        </div>
    )
}

export default Images
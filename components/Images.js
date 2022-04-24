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
        const { url, height, width } = images[0]
        return (
            <Gallery>
                <div className='grid grid-cols-1 h-[576px]'>
                    <Item
                        original={ url }
                        width={ width }
                        height={ height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                <Image className='object-contain' src={ url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                </div>
            </Gallery>
        )
    }

    const renderTwoImage = () => {
        const { url, height, width } = images[0]
        return (
            <Gallery>
                <div className='w-full h-[576px]'>
                    <Item
                        original={ url }
                        width={ width }
                        height={ height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                <Image className='object-cover' src={ url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                    <Item
                        original={ url }
                        width={ width }
                        height={ height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                <Image className='object-cover' src={ url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                </div>
            </Gallery>
        )
    }

    const renderThreeImage = () => {
        const { url, height, width } = images[0]
        return (
            <Gallery>
                <div className='grid grid-cols-2 h-[576px]'>
                    <Item
                        original={ url }
                        width={ width }
                        height={ height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                <Image className='object-cover' src={ url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                    <div className='h-full'>

                        <Item
                            original={ url }
                            width={ width }
                            height={ height }
                            objectFit='cover'

                        >
                            { ({ ref, open, }) => (
                                // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                    <Image className='object-cover' src={ url } layout="fill" alt="img" />
                                </div>
                            ) }
                        </Item>
                        <Item
                            original={ url }
                            width={ width }
                            height={ height }
                            objectFit='cover'

                        >
                            { ({ ref, open, }) => (
                                // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                    <Image className='object-cover' src={ url } layout="fill" alt="img" />
                                </div>
                            ) }
                        </Item>
                    </div>
                </div>
            </Gallery>
        )
    }



    return (
        <div className='w-full shadow-sm shadow-tertiary-dark'>
            { renderThreeImage() }

        </div>
    )
}

export default Images
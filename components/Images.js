import Image from 'next/image'
import { useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

const Images = ({ images }) => {

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
        const image0 = images[0]
        return (
            <Gallery>
                <div className='grid grid-cols-1 h-[576px]'>
                    <Item
                        original={ images[0].url }
                        width={ images[0].width }
                        height={ images[0].height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                <Image className='object-contain' src={ images[0].url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                </div>
            </Gallery>
        )
    }

    const renderTwoImage = () => {
        const image0to1 = images.slice(0, 2)
        return (
            <Gallery>
                <div className='w-full h-[576px] space-y-1 overflow-hidden'>
                    { image0to1.map((image) => (
                        <Item
                            key={ image.url }
                            original={ image.url }
                            width={ image.width }
                            height={ image.height }
                            objectFit='cover'

                        >
                            { ({ ref, open, }) => (
                                // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                    <Image className='object-cover' src={ image.url } layout="fill" alt="img" />
                                </div>
                            ) }
                        </Item>
                    )) }
                </div>
            </Gallery>
        )
    }

    const renderThreeImage = () => {
        const image0 = images[0]
        const images1to2 = images.slice(1, 3)
        return (
            <Gallery>
                <div className='grid grid-cols-2 h-[576px] space-x-1 overflow-hidden'>
                    <Item
                        original={ image0.url }
                        width={ image0.width }
                        height={ image0.height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?images=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                <Image className='object-cover' src={ image0.url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                    <div className='h-full space-y-1'>
                        { images1to2.map((image) => (
                            <Item
                                key={ image.url }
                                original={ image.url }
                                width={ image.width }
                                height={ image.height }
                                objectFit='cover'

                            >
                                { ({ ref, open, }) => (
                                    // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?images=1" />
                                    <div ref={ ref } onClick={ open } className='relative h-1/2 cursor-pointer'>
                                        <Image className='object-cover' src={ image.url } layout="fill" alt="img" />
                                    </div>
                                ) }
                            </Item>
                        )) }

                    </div>
                </div>
            </Gallery>
        )
    }


    const renderFourImage = () => {
        const image0 = images[0]
        const images1to3 = images.slice(1, 4)
        return (
            <Gallery>
                <div className='grid grid-cols-3 h-[576px] space-x-1 overflow-hidden'>
                    <Item
                        key={ image0.url }
                        original={ image0.url }
                        width={ image0.width }
                        height={ image0.height }
                        objectFit='cover'

                    >
                        { ({ ref, open, }) => (
                            // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                            <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer col-span-2'>
                                <Image className='object-cover' src={ image0.url } layout="fill" alt="img" />
                            </div>
                        ) }
                    </Item>
                    <div className='h-full space-y-1'>
                        { images1to3.map((image) => (

                            <Item
                                key={ image.url }
                                original={ image.url }
                                width={ image.width }
                                height={ image.height }
                                objectFit='cover'

                            >
                                { ({ ref, open, }) => (
                                    // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                    <div ref={ ref } onClick={ open } className='relative h-1/3 cursor-pointer'>
                                        <Image className='object-cover' src={ image.url } layout="fill" alt="img" />
                                    </div>
                                ) }
                            </Item>
                        )) }

                    </div>
                </div>
            </Gallery>
        )
    }

    const renderFiveImage = () => {
        // check if images.length is greater than 5
        const showOverlay = images.length > 5
        const overlayNumber = '+' + (images.length - 5)
        const images0to1 = images.slice(0, 2)
        const images2to4 = images.slice(2, 5)
        const restImages = images.slice(5)
        return (
            <Gallery>

                <div className='h-[576px] space-y-1 overflow-hidden'>
                    <div className='h-2/3 grid grid-cols-2 space-x-1'>
                        { images0to1.map((image) => (
                            <Item
                                key={ image.url }
                                original={ image.url }
                                width={ image.width }
                                height={ image.height }
                                objectFit='cover'

                            >
                                { ({ ref, open, }) => (
                                    // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                    <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                        <Image className='object-cover' src={ image.url } layout="fill" alt="img" />
                                    </div>
                                ) }
                            </Item>
                        )) }
                    </div>
                    <div className='h-1/3 grid grid-cols-3 space-x-1'>
                        { images2to4.map((image, index) => (
                            <Item
                                key={ image.url }
                                original={ image.url }
                                width={ image.width }
                                height={ image.height }
                                objectFit='cover'

                            >
                                { ({ ref, open, }) => (
                                    // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                    <div ref={ ref } onClick={ open } className='relative h-full cursor-pointer'>
                                        <Image className={ `object-cover ${index === 2 && showOverlay && 'brightness-50'}` } src={ image.url } layout="fill" alt="img" />
                                        { index === 2 && showOverlay && (
                                            <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center font-semibold text-3xl'>{ overlayNumber }</div>
                                        ) }
                                    </div>
                                ) }
                            </Item>
                        )) }
                    </div>
                    { showOverlay && restImages.map((image) => (
                        <Item
                            key={ image.url }
                            original={ image.url }
                            width={ image.width }
                            height={ image.height }
                            objectFit='cover'
                        >
                            { ({ ref, }) => (
                                // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
                                <div ref={ ref } />

                            ) }

                        </Item>
                    )) }
                </div>
            </Gallery>
        )
    }

    return (
        <div className='w-full shadow-sm shadow-tertiary-dark'>
            { images.length === 1 && renderOneImage() }
            { images.length === 2 && renderTwoImage() }
            { images.length === 3 && renderThreeImage() }
            { images.length === 4 && renderFourImage() }
            { images.length >= 5 && renderFiveImage() }
        </div>
    )
}

export default Images
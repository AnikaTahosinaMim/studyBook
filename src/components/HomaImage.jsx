import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const HomeImage = () => {
	return (
		<div className='relative w-full h-[500px] md:h-[650px] overflow-hidden'>
			<Image
				src='/home.jpg'
				alt='study room'
				fill
				className='object-cover'
				priority
			/>

			<div className='absolute inset-0 bg-black/50'></div>

			<div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
				<h1 className='text-white text-3xl md:text-5xl font-bold'>
					Find Your Perfect Study Room
				</h1>

				<p className='text-gray-200 mt-4 max-w-xl text-sm md:text-lg'>
					Browse and book quiet, private study rooms in your library. List your
					own room and earn.
				</p>

				<Link
					href='/booking'
					className='mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition'
				>
					Explore Rooms
				</Link>
			</div>
		</div>
	)
}

export default HomeImage

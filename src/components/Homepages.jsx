import Image from 'next/image'
import React from 'react'
import HomeCard from './HomeCard'

const Homepages = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
		cache: 'no-store',
	})

	const nooks = await res.json()

	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto'>
				{nooks.map((nook) => (
					<HomeCard key={nook._id} nook={nook}></HomeCard>
				))}
			</div>
		</div>
	)
}

export default Homepages

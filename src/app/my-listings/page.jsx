import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import MyListingsManager from '@/components/MyListingsManager'

const MyListing = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, {
		cache: 'no-store',
	})
	const rooms = await res.json()
	const myRooms = Array.isArray(rooms)
		? rooms.filter((room) => room.ownerEmail === session?.user?.email)
		: []

	return (
		<div className='container mx-auto py-10'>
			<h2 className='text-3xl font-bold mb-8 text-center'>My Listings</h2>
			{session?.user?.email ? (
				<MyListingsManager rooms={myRooms} />
			) : (
				<p className='text-center text-slate-600'>
					Please log in to view your listings.
				</p>
			)}
		</div>
	)
}

export default MyListing

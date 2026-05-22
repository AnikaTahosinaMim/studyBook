'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSession } from '@/lib/auth-client'
import HomeCard from '@/components/HomeCard'

const RoomsPage = () => {
	const router = useRouter()
	const { data: session, isPending } = useSession()
	const [rooms, setRooms] = useState([])
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const fetchRooms = async () => {
		setLoading(true)
		setMessage('')

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`)
			if (!res.ok) {
				throw new Error('Failed to fetch rooms')
			}
			const data = await res.json()
			setRooms(data)
		} catch (error) {
			setMessage(error.message || 'Unable to load rooms')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchRooms()
	}, [])

	return (
		<div className='space-y-8 my-6'>
			<div className='container mx-auto'>
				<h2 className='text-3xl font-bold mb-4'>Room List</h2>

				{loading ? (
					<p>Loading rooms...</p>
				) : rooms.length ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto'>
						{rooms.map((room) => (
							<HomeCard key={room._id} nook={room}></HomeCard>
						))}
					</div>
				) : (
					<p>No rooms found yet.</p>
				)}
			</div>
		</div>
	)
}

export default RoomsPage

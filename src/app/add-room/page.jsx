'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSession } from '@/lib/auth-client'

const AddRooms = () => {
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

	const handleSUbmit = async (e) => {
		e.preventDefault()
		setMessage('')
		const formElement = e.currentTarget

		const formData = new FormData(formElement)
		const roomData = Object.fromEntries(formData.entries())
		const amenities = formData.getAll('amenities')
		if (amenities.length) {
			roomData.amenities = amenities
		}

		if (!session?.user?.email) {
			toast.error('Login required to add a room')
			return
		}

		roomData.ownerEmail = session.user.email
		roomData.ownerName = session.user.name || ''

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(roomData),
			})

			if (!res.ok) {
				throw new Error('Failed to add room')
			}

			formElement.reset()
			toast.success('Room added successfully')
			await fetchRooms()
			router.push('/my-listings')
		} catch (error) {
			toast.error(error.message || 'Unable to submit room')
			setMessage(error.message || 'Unable to submit room')
		}
	}

	return (
		<div className='space-y-8 my-6'>
			<div>
				<h2 className='text-3xl font-bold mb-4 ml-8'>Add Your New Room</h2>
				<form onSubmit={handleSUbmit} className='space-y-5 max-w-xl mx-auto'>
					<input
						type='text'
						name='roomName'
						placeholder='Room Name'
						required
						className='w-full border p-2 rounded'
					/>

					<textarea
						name='description'
						placeholder='Description'
						required
						className='w-full border p-2 rounded'
					/>

					<input
						type='text'
						name='roomImage'
						placeholder='Image URL'
						className='w-full border p-2 rounded'
					/>

					<input
						type='text'
						name='floor'
						placeholder='Floor (e.g. 3rd Floor)'
						className='w-full border p-2 rounded'
					/>

					<input
						type='number'
						name='capacity'
						placeholder='Capacity'
						className='w-full border p-2 rounded'
					/>

					<input
						type='number'
						name='hourlyRate'
						placeholder='Hourly Rate ($)'
						className='w-full border p-2 rounded'
					/>

					<div>
						<p className='font-semibold mb-2'>Amenities</p>

						<label className='flex items-center gap-2'>
							<input type='checkbox' name='amenities' value='Whiteboard' />
							Whiteboard
						</label>

						<label className='flex items-center gap-2'>
							<input type='checkbox' name='amenities' value='Projector' />
							Projector
						</label>

						<label className='flex items-center gap-2'>
							<input type='checkbox' name='amenities' value='Wi-Fi' />
							Wi-Fi
						</label>

						<label className='flex items-center gap-2'>
							<input type='checkbox' name='amenities' value='Power Outlets' />
							Power Outlets
						</label>

						<label className='flex items-center gap-2'>
							<input type='checkbox' name='amenities' value='Quiet Zone' />
							Quiet Zone
						</label>

						<label className='flex items-center gap-2'>
							<input
								type='checkbox'
								name='amenities'
								value='Air Conditioning'
							/>
							Air Conditioning
						</label>
					</div>

					<button
						type='submit'
						className='bg-purple-600 text-white px-4 py-2 rounded w-full'
					>
						Submit
					</button>

					{message && (
						<p className='text-center text-sm text-green-700'>{message}</p>
					)}
				</form>
			</div>

			<div className='max-w-4xl mx-auto'>
				<h2 className='text-3xl font-bold mb-4'>Room List</h2>

				{loading ? (
					<p>Loading rooms...</p>
				) : rooms.length ? (
					<div className='grid gap-4'>
						{rooms.map((room) => (
							<div
								key={room._id || room.roomName}
								className='border rounded p-4 shadow-sm'
							>
								<h3 className='text-xl font-semibold'>{room.roomName}</h3>
								<p>{room.description}</p>
								<p className='text-sm mt-2'>Floor: {room.floor || 'N/A'}</p>
								<p className='text-sm'>Capacity: {room.capacity || 'N/A'}</p>
								<p className='text-sm'>Rate: ${room.hourlyRate || 'N/A'}</p>
								{room.amenities ? (
									<p className='text-sm mt-2'>
										Amenities:{' '}
										{Array.isArray(room.amenities)
											? room.amenities.join(', ')
											: room.amenities}
									</p>
								) : null}
							</div>
						))}
					</div>
				) : (
					<p>No rooms found yet.</p>
				)}
			</div>
		</div>
	)
}

export default AddRooms

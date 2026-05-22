'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const MyListingsManager = ({ rooms }) => {
	const [listings, setListings] = useState(rooms || [])
	const [selectedRoom, setSelectedRoom] = useState(null)
	const [editForm, setEditForm] = useState({
		roomName: '',
		roomImage: '',
		pricePerHour: '',
		specialNote: '',
		amenities: '',
	})
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [activeRoom, setActiveRoom] = useState(null)
	const [statusMessage, setStatusMessage] = useState('')
	const [isBusy, setIsBusy] = useState(false)

	const openEditModal = (room) => {
		setSelectedRoom(room)
		setEditForm({
			roomName: room.roomName || '',
			roomImage: room.roomImage || '',
			pricePerHour: room.pricePerHour ?? room.hourlyRate ?? '',
			specialNote: room.specialNote || '',
			amenities: Array.isArray(room.amenities)
				? room.amenities.join(', ')
				: room.amenities || '',
		})
		setStatusMessage('')
		setIsEditOpen(true)
	}

	const openDeleteModal = (room) => {
		setActiveRoom(room)
		setStatusMessage('')
		setIsDeleteOpen(true)
	}

	const closeModals = () => {
		setIsEditOpen(false)
		setIsDeleteOpen(false)
		setSelectedRoom(null)
		setActiveRoom(null)
		setStatusMessage('')
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setEditForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleEditSubmit = async (event) => {
		event.preventDefault()
		if (!selectedRoom) return

		setIsBusy(true)
		setStatusMessage('')

		const payload = {
			roomName: editForm.roomName,
			roomImage: editForm.roomImage,
			pricePerHour: editForm.pricePerHour,
			specialNote: editForm.specialNote,
			amenities: editForm.amenities
				.split(',')
				.map((item) => item.trim())
				.filter(Boolean),
		}

		try {
			console.debug('Updating room', selectedRoom._id, payload)
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/room/${selectedRoom._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				},
			)

			if (response.status === 404) {
				console.warn('PUT returned 404, retrying with PATCH')
				response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/room/${selectedRoom._id}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(payload),
					},
				)
			}

			if (!response.ok) {
				const text = await response.text()
				let msg = text
				try {
					const j = JSON.parse(text)
					msg = j.message || j.error || JSON.stringify(j)
				} catch (e) {}
				console.error('Update failed', response.status, msg)
				setStatusMessage(`Update failed (${response.status}): ${msg}`)
				return
			}

			const updatedRoom = await response.json()
			setListings((current) =>
				current.map((room) =>
					room._id === updatedRoom._id ? updatedRoom : room,
				),
			)
			setStatusMessage('Listing updated successfully.')
			setTimeout(closeModals, 1000)
		} catch (error) {
			console.error('Update error', error)
			setStatusMessage(error.message || 'Update failed.')
		} finally {
			setIsBusy(false)
		}
	}

	const handleDeleteConfirm = async () => {
		if (!activeRoom) return

		setIsBusy(true)
		setStatusMessage('')

		try {
			console.debug('Deleting room', activeRoom._id)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/room/${activeRoom._id}`,
				{
					method: 'DELETE',
				},
			)

			if (!response.ok) {
				const text = await response.text()
				let msg = text
				try {
					const j = JSON.parse(text)
					msg = j.message || j.error || JSON.stringify(j)
				} catch (e) {}
				console.error('Delete failed', response.status, msg)
				setStatusMessage(`Delete failed (${response.status}): ${msg}`)
				return
			}

			setListings((current) =>
				current.filter((room) => room._id !== activeRoom._id),
			)
			setStatusMessage('Listing deleted successfully.')
			setTimeout(closeModals, 400)
		} catch (error) {
			console.error('Delete error', error)
			setStatusMessage(error.message || 'Delete failed.')
		} finally {
			setIsBusy(false)
		}
	}
	const getImageUrl = (image) => {
		if (!image) return '/placeholder.jpg'

		if (image.startsWith('http://') || image.startsWith('https://')) {
			return image
		}

		return image.startsWith('/') ? image : `/${image}`
	}
	return (
		<div>
			{listings.length ? (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{listings.map((room) => (
						<div
							key={room._id || room.roomName}
							className='group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-shadow hover:shadow-2xl'
						>
							<div className='relative h-56 w-full overflow-hidden rounded-t-3xl bg-slate-100'>
								{/* add room image and make fallback if rooms image is not found */}
								<img
									src={getImageUrl(room.image)}
									alt={room.title || 'Room image'}
									className='w-full h-48 object-cover'
								/>
							</div>

							<div className='p-5'>
								<h3 className='text-xl font-semibold text-slate-900'>
									{room.roomName || 'Untitled room'}
								</h3>
								<p className='mt-3 text-sm text-slate-600 line-clamp-2'>
									{room.specialNote || 'No description provided.'}
								</p>

								<div className='mt-4 flex flex-wrap gap-2 text-sm text-slate-500'>
									{room.pricePerHour ? (
										<span>Price: ${room.pricePerHour}/hr</span>
									) : null}
									{room.durationHour ? (
										<span>Booked for {room.durationHour} hr</span>
									) : null}
								</div>

								<div className='mt-6 flex flex-wrap gap-3'>
									<Link
										href={`/booking/${room._id}`}
										className='inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100'
									>
										View
									</Link>
									<button
										type='button'
										onClick={() => openEditModal(room)}
										className='inline-flex items-center justify-center rounded-2xl border border-purple-600 bg-white px-4 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-50'
									>
										Edit
									</button>
									<button
										type='button'
										onClick={() => openDeleteModal(room)}
										className='inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700'
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl'>
					<p className='text-lg font-medium text-slate-700'>
						You have not added any listings yet.
					</p>
					<p className='mt-3 text-sm text-slate-500'>
						Add rooms first, then edit or remove them from this page.
					</p>
				</div>
			)}

			{isEditOpen && selectedRoom ? (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
					<div className='w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl'>
						<div className='flex items-center justify-between gap-4'>
							<div>
								<h2 className='text-2xl font-semibold text-slate-900'>
									Edit Listing
								</h2>
								<p className='mt-1 text-sm text-slate-500'>
									Update the room details and save your changes.
								</p>
							</div>
							<button
								type='button'
								onClick={closeModals}
								className='rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50'
							>
								Close
							</button>
						</div>

						<form onSubmit={handleEditSubmit} className='mt-6 space-y-5'>
							<div>
								<label className='mb-2 block text-sm font-medium text-slate-700'>
									Room name
								</label>
								<input
									name='roomName'
									value={editForm.roomName}
									onChange={handleInputChange}
									className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white'
								/>
							</div>

							<div>
								<label className='mb-2 block text-sm font-medium text-slate-700'>
									Image URL
								</label>
								<input
									name='roomImage'
									value={editForm.roomImage}
									onChange={handleInputChange}
									className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white'
								/>
							</div>

							<div className='grid gap-4 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-slate-700'>
										Price per hour
									</label>
									<input
										name='pricePerHour'
										value={editForm.pricePerHour}
										onChange={handleInputChange}
										className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-slate-700'>
										Amenities
									</label>
									<input
										name='amenities'
										value={editForm.amenities}
										onChange={handleInputChange}
										placeholder='Comma separated'
										className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white'
									/>
								</div>
							</div>

							<div>
								<label className='mb-2 block text-sm font-medium text-slate-700'>
									Special note
								</label>
								<textarea
									name='specialNote'
									value={editForm.specialNote}
									onChange={handleInputChange}
									rows={4}
									className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white'
								/>
							</div>

							{statusMessage ? (
								<p className='text-sm text-slate-600'>{statusMessage}</p>
							) : null}

							<div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
								<button
									type='button'
									onClick={closeModals}
									className='rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
								>
									Cancel
								</button>
								<button
									type='submit'
									disabled={isBusy}
									className='rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60'
								>
									{isBusy ? 'Saving...' : 'Save changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}

			{isDeleteOpen && activeRoom ? (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
					<div className='w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl'>
						<h2 className='text-2xl font-semibold text-slate-900'>
							Delete listing
						</h2>
						<p className='mt-3 text-sm text-slate-600'>
							Are you sure you want to delete{' '}
							<strong>{activeRoom.roomName}</strong>? This action cannot be
							undone.
						</p>
						{statusMessage ? (
							<p className='mt-3 text-sm text-red-600'>{statusMessage}</p>
						) : null}
						<div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end'>
							<button
								type='button'
								onClick={closeModals}
								className='rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
							>
								Cancel
							</button>
							<button
								type='button'
								onClick={handleDeleteConfirm}
								disabled={isBusy}
								className='rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
							>
								{isBusy ? 'Deleting...' : 'Delete listing'}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default MyListingsManager

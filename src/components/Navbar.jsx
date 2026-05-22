'use client'

import { signOut, useSession } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaBookReader } from 'react-icons/fa'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
	const router = useRouter()
	const pathname = usePathname()

	const { data: session } = useSession()

	const [open, setOpen] = useState(false)
	const [dropdown, setDropdown] = useState(false)

	const handleSignout = async () => {
		await signOut()
		router.push('/login')
	}

	// ACTIVE ROUTE CHECK
	const isActive = (path) => pathname === path

	return (
		<nav className='sticky top-0 z-50 bg-white border-b shadow-sm'>
			<div className='container mx-auto flex items-center justify-between px-4 py-3'>
				{/* Logo */}
				<div className='flex items-center gap-2 font-bold text-xl'>
					<FaBookReader className='text-purple-600' />
					<span>Study Nook</span>
				</div>

				{/* Desktop Menu */}
				<div className='hidden md:flex items-center gap-6 text-gray-700'>
					<Link
						href='/'
						className={`hover:text-purple-600 transition ${
							isActive('/') ? 'text-purple-600 font-semibold' : ''
						}`}
					>
						Home
					</Link>

					<Link
						href='/rooms'
						className={`hover:text-purple-600 transition ${
							isActive('/rooms') ? 'text-purple-600 font-semibold' : ''
						}`}
					>
						Rooms
					</Link>

					{session && (
						<>
							<Link
								href='/add-room'
								className={`hover:text-purple-600 transition ${
									isActive('/add-room') ? 'text-purple-600 font-semibold' : ''
								}`}
							>
								Add Room
							</Link>

							<Link
								href='/my-listings'
								className={`hover:text-purple-600 transition ${
									isActive('/my-listings')
										? 'text-purple-600 font-semibold'
										: ''
								}`}
							>
								My Listings
							</Link>

							<Link
								href='/my-bookings'
								className={`hover:text-purple-600 transition ${
									isActive('/my-bookings')
										? 'text-purple-600 font-semibold'
										: ''
								}`}
							>
								My Bookings
							</Link>
						</>
					)}
				</div>

				{/* Right Side */}
				<div className='hidden md:flex items-center gap-4'>
					{!session ? (
						<>
							<Link href='/login' className='text-purple-600 hover:underline'>
								Login
							</Link>
							<Link
								href='/register'
								className='text-purple-600 hover:underline'
							>
								Register
							</Link>
						</>
					) : (
						<div className='relative'>
							{/* Profile Button */}
							<button
								onClick={() => setDropdown(!dropdown)}
								className='flex items-center gap-2 border px-2 py-1 rounded-full hover:shadow-md'
							>
								<Image
									src={session?.user?.image || '/home.jpg'}
									width={35}
									height={35}
									alt='user'
									className='rounded-full'
								/>
								<span className='text-sm font-medium'>
									{session?.user?.name}
								</span>
							</button>

							{/* Dropdown */}
							{dropdown && (
								<div className='absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden'>
									<Link
										href='/my-bookings'
										onClick={() => setDropdown(false)}
										className='block px-4 py-2 hover:bg-gray-100'
									>
										My Bookings
									</Link>

									<Link
										href='/my-listings'
										onClick={() => setDropdown(false)}
										className='block px-4 py-2 hover:bg-gray-100'
									>
										My Listings
									</Link>

									<button
										onClick={handleSignout}
										className='w-full text-left px-4 py-2 hover:bg-red-100 text-red-600'
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Mobile Button */}
				<button className='md:hidden' onClick={() => setOpen(!open)}>
					{open ? <X /> : <Menu />}
				</button>
			</div>

			{/* Mobile Menu */}
			{open && (
				<div className='md:hidden flex flex-col gap-4 px-4 py-3 border-t bg-white'>
					<Link href='/' onClick={() => setOpen(false)}>
						Home
					</Link>
					<Link href='/rooms' onClick={() => setOpen(false)}>
						Rooms
					</Link>

					{session && (
						<>
							<Link href='/add-room' onClick={() => setOpen(false)}>
								Add Room
							</Link>
							<Link href='/my-listings' onClick={() => setOpen(false)}>
								My Listings
							</Link>
							<Link href='/my-bookings' onClick={() => setOpen(false)}>
								My Bookings
							</Link>
						</>
					)}

					{!session ? (
						<div className='flex flex-col gap-2'>
							<Link href='/login'>Login</Link>
							<Link href='/register'>Register</Link>
						</div>
					) : (
						<button onClick={handleSignout} className='text-red-500 text-left'>
							Logout
						</button>
					)}
				</div>
			)}
		</nav>
	)
}

export default Navbar

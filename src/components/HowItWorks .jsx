import { FaSearch, FaCreditCard, FaBookOpen } from 'react-icons/fa'

const HowItWorks = () => {
	return (
		<div className='py-16 px-6 text-center bg-gray-50'>
			{/* Title */}
			<h2 className='text-3xl font-bold mb-12'>How It Works</h2>

			{/* Cards */}
			<div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
				{/* Step 1 */}
				<div className='p-6 border rounded-xl bg-white shadow hover:scale-105 transition duration-300'>
					<FaSearch className='text-4xl text-purple-600 mx-auto mb-3 animate-bounce' />
					<h3 className='text-xl font-semibold'>1. Browse Rooms</h3>
					<p className='mt-2 text-gray-600'>
						Explore available study rooms based on location and capacity.
					</p>
				</div>

				{/* Step 2 */}
				<div className='p-6 border rounded-xl bg-white shadow hover:scale-105 transition duration-300'>
					<FaCreditCard className='text-4xl text-purple-600 mx-auto mb-3 animate-pulse' />
					<h3 className='text-xl font-semibold'>2. Book Instantly</h3>
					<p className='mt-2 text-gray-600'>
						Select your preferred room and book it with one click.
					</p>
				</div>

				{/* Step 3 */}
				<div className='p-6 border rounded-xl bg-white shadow hover:scale-105 transition duration-300'>
					<FaBookOpen className='text-4xl text-purple-600 mx-auto mb-3 animate-bounce' />
					<h3 className='text-xl font-semibold'>3. Start Studying</h3>
					<p className='mt-2 text-gray-600'>
						Visit the room and enjoy a quiet productive environment.
					</p>
				</div>
			</div>
		</div>
	)
}

export default HowItWorks

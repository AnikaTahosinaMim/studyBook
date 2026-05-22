'use client'

import { motion } from 'framer-motion'
import { FaBolt, FaLock, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa'

const WhyStudyNook = () => {
	return (
		<div className='py-20 px-6 bg-gradient-to-b from-purple-50 to-white text-center'>
			{/* Title */}
			<motion.h2
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='text-4xl font-bold mb-14'
			>
				Why StudyNook?
			</motion.h2>

			{/* Grid */}
			<div className='grid md:grid-cols-4 gap-8 max-w-6xl mx-auto'>
				{/* Card 1 */}
				<motion.div
					whileHover={{ scale: 1.05 }}
					className='p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-purple-100 transition'
				>
					<FaBolt className='text-4xl text-purple-600 mx-auto mb-3' />
					<h3 className='text-lg font-semibold'>Fast Booking</h3>
					<p className='text-gray-600 text-sm mt-2'>
						Book study rooms instantly without waiting.
					</p>
				</motion.div>

				{/* Card 2 */}
				<motion.div
					whileHover={{ scale: 1.05 }}
					className='p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-purple-100 transition'
				>
					<FaLock className='text-4xl text-purple-600 mx-auto mb-3' />
					<h3 className='text-lg font-semibold'>Secure System</h3>
					<p className='text-gray-600 text-sm mt-2'>
						Verified rooms with safe booking system.
					</p>
				</motion.div>

				{/* Card 3 */}
				<motion.div
					whileHover={{ scale: 1.05 }}
					className='p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-purple-100 transition'
				>
					<FaMoneyBillWave className='text-4xl text-purple-600 mx-auto mb-3' />
					<h3 className='text-lg font-semibold'>Affordable Price</h3>
					<p className='text-gray-600 text-sm mt-2'>
						Pay only for the time you use.
					</p>
				</motion.div>

				{/* Card 4 */}
				<motion.div
					whileHover={{ scale: 1.05 }}
					className='p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-purple-100 transition'
				>
					<FaMapMarkerAlt className='text-4xl text-purple-600 mx-auto mb-3' />
					<h3 className='text-lg font-semibold'>Easy Access</h3>
					<p className='text-gray-600 text-sm mt-2'>
						Find rooms near your location easily.
					</p>
				</motion.div>
			</div>
		</div>
	)
}

export default WhyStudyNook

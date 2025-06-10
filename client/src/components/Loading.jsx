// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Loading = () => {
	return (
		<div className='fixed inset-0 bg-base-100 dark:bg-base-300 flex items-center justify-center z-50'>
			<div className='text-center space-y-8'>
				{/* Growing Plant Animation */}
				<motion.div
					className='relative h-40 w-40 mx-auto'
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					{/* Plant Pot */}
					<motion.div
						className='absolute bottom-0 left-1/2 -translate-x-1/2'
						initial={{ y: 50 }}
						animate={{ y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						<svg width='80' height='40' viewBox='0 0 80 40'>
							<path
								d='M10 40 Q40 30 70 40 L60 20 Q40 10 20 20 Z'
								className='fill-primary'
							/>
						</svg>
					</motion.div>

					{/* Plant Stem */}
					<motion.div
						className='absolute left-1/2 -translate-x-1/2 bg-secondary'
						initial={{ height: 0 }}
						animate={{ height: '80px' }}
						transition={{ duration: 1, delay: 0.5 }}
						style={{
							width: '8px',
							bottom: '40px',
							borderRadius: '4px',
						}}
					/>

					{/* Leaves */}
					<motion.div
						className='absolute left-1/2 -translate-x-1/2'
						initial={{ rotate: 0 }}
						animate={{ rotate: [-10, 10, -10] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 1.5,
						}}
						style={{ bottom: '80px' }}
					>
						<svg width='60' height='60' viewBox='0 0 60 60'>
							<path
								d='M30 0 Q45 20 30 40 Q15 20 30 0'
								className='fill-secondary'
							/>
							<path
								d='M30 0 Q15 20 30 40 Q45 20 30 0'
								className='fill-secondary'
								transform='translate(60) scale(-1 1)'
							/>
						</svg>
					</motion.div>
				</motion.div>

				{/* Loading Text */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					className='text-xl font-semibold text-primary dark:text-secondary'
				>
					Growing Ideas...
					<motion.span
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className='ml-1'
					>
						🌱
					</motion.span>
				</motion.div>
			</div>
		</div>
	);
};

export default Loading;

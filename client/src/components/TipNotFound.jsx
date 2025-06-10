import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import wiltingLeaf from '../assets/wilting-leaf.json';
import { FaSeedling, FaArrowLeft } from 'react-icons/fa';

const TipNotFound = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='min-h-[90vh] flex items-center justify-center bg-base-100 p-8'
		>
			<div className='max-w-4xl text-center space-y-8'>
				<motion.div
					initial={{ scale: 0.5 }}
					animate={{ scale: 1 }}
					className='mx-auto w-full max-w-md'
				>
					<Lottie animationData={wiltingLeaf} loop={true} />
				</motion.div>

				<motion.h1
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					className='text-4xl md:text-6xl font-bold text-primary flex items-center justify-center gap-4'
				>
					<FaSeedling className='text-secondary' /> Tip Not Found
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='text-xl  '
				>
					This gardening tip seems to have been composted. Here are some fresh
					sprouts instead!
				</motion.p>

				<motion.div
					className='flex flex-wrap gap-4 justify-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<Link to='/tips' className='btn btn-primary gap-2'>
						Browse All Tips
					</Link>
					<button
						onClick={() => window.history.back()}
						className='btn btn-secondary gap-2'
					>
						<FaArrowLeft /> Try Again
					</button>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default TipNotFound;

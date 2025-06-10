import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import growingPlant from '../assets/growing-plant.json';
import { FaHome, FaLeaf, FaArrowLeft } from 'react-icons/fa';
import { useStaticTitle } from '../lib/utils';

const NotFound = () => {
	useStaticTitle();

	const suggestions = [
		{
			name: 'Gardening Tips',
			path: '/tips',
			description: 'Discover community wisdom',
		},
		{
			name: 'Plant Care',
			path: '/categories/plant-care',
			description: 'Nurture your greens',
		},
		{
			name: 'Expert Gardeners',
			path: '/explore-gardeners',
			description: 'Meet our community',
		},
	];

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
					<Lottie animationData={growingPlant} loop={true} />
				</motion.div>

				<motion.h1
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					className='text-4xl md:text-6xl font-bold text-primary flex items-center justify-center gap-4'
				>
					<FaLeaf className='text-secondary' /> 404 - Path Not Found
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='text-xl '
				>
					Oops! The garden path you're looking for has overgrown. Let's help you
					find your way back!
				</motion.p>

				<motion.div
					className='flex flex-wrap gap-4 justify-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<Link to='/' className='btn btn-primary gap-2'>
						<FaHome /> Return Home
					</Link>
					<button
						onClick={() => window.history.back()}
						className='btn btn-secondary gap-2'
					>
						<FaArrowLeft /> Go Back
					</button>
				</motion.div>

				{suggestions.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className='mt-12'
					>
						<h2 className='text-2xl font-bold mb-6'>
							Explore These Garden Paths Instead
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{suggestions.map((item, index) => (
								<motion.div
									key={index}
									whileHover={{ y: -5 }}
									className='card bg-base-200 shadow-md hover:shadow-xl transition-shadow'
								>
									<div className='card-body items-center text-center'>
										<h3 className='card-title text-primary'>{item.name}</h3>
										<p className='text-sm'>{item.description}</p>
										<Link to={item.path} className='btn btn-sm btn-accent mt-4'>
											Explore
										</Link>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default NotFound;

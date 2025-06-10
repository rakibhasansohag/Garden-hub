// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Link } from 'react-router';

const cardVariants = {
	offscreen: { opacity: 0, scale: 0.9 },
	onscreen: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const GardenersCard = ({ activeGardeners }) => {
	return (
		<div className='section mx-auto px-4'>
			<section className='py-12'>
				<h2 className='text-3xl font-bold text-center my-16 text-primary'>
					Featured Active Gardeners
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{activeGardeners.map((gardener, idx) => (
						<motion.div
							key={gardener._id}
							className='bg-base-100 dark:bg-base-300 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300'
							initial='offscreen'
							whileInView='onscreen'
							viewport={{ once: true, amount: 0.3 }}
							variants={cardVariants}
							transition={{ delay: idx * 0.1 }}
						>
							<div className='relative h-56 overflow-hidden'>
								<img
									src={gardener.photoURL}
									alt={gardener.name}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60' />
								<div className='absolute bottom-4 left-4'>
									<h3 className='text-xl font-semibold text-white drop-shadow-lg'>
										{gardener.name}
									</h3>
								</div>
							</div>
							<div className='p-6 text-center'>
								<p className='text-sm  mb-2'>
									Age: {gardener.age} | {gardener.gender}
								</p>
								<div className='flex flex-wrap justify-center gap-2 mb-4'>
									{gardener.experiences.map((exp, index) => (
										<span
											key={index}
											className='px-3 py-1 bg-secondary text-white rounded-full text-xs'
										>
											{exp}
										</span>
									))}
								</div>
								<p className='mb-4'>
									💬{' '}
									<span className='font-bold'>{gardener.totalTipsShared} </span>
									tips shared
								</p>
								<button className='btn btn-outline btn-primary rounded-full px-6 py-2 transition-transform duration-300 hover:scale-105'>
									View Profile
								</button>
							</div>
						</motion.div>
					))}
				</div>
				<Link to={'/gardeners'} className='mt-16 text-center block'>
					<button className='btn rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out border-2 border-dashed border-secondary text-primary hover:text-white  transform hover:scale-110 text-2xl px-8 py-5 pb-6 hover:bg-primary'>
						Show More
					</button>
				</Link>
			</section>
		</div>
	);
};

export default GardenersCard;

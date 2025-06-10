import { useLoaderData } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useStaticTitle } from '../lib/utils';
import NotFound from './NotFound';

export default function ExploreGardeners() {
	useStaticTitle();

	const gardeners = useLoaderData();

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, type: 'spring', stiffness: 200 },
		}),
	};

	// console.log(gardeners);

	if (!gardeners) return <NotFound />;

	return (
		<section className='section py-12'>
			<h2 className='text-3xl font-bold text-center mb-8 text-primary'>
				Explore Gardeners
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{gardeners?.map((g, idx) => (
					<motion.div
						key={g._id}
						custom={idx}
						initial='hidden'
						animate='visible'
						variants={cardVariants}
						className='card bg-base-300 shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden'
					>
						<figure className='h-44 overflow-hidden'>
							<img
								src={g.photoURL}
								alt={g.name}
								className='w-full h-full object-cover'
							/>
						</figure>
						<div className='card-body'>
							<h3 className='card-title text-xl text-primary'>{g.name}</h3>
							<p className='text-sm text-gray-600'>
								Age: {g.age || 'N/A'} | Gender: {g.gender}
							</p>
							<p className='badge badge-outline mt-2 inline-block'>
								{g.status}
							</p>
							<ul className='list-disc list-inside mt-4 text-sm space-y-1'>
								{g.experiences.map((exp, i) => (
									<li key={i}>{exp}</li>
								))}
							</ul>
							<div className='mt-4'>
								<span className='font-medium'>Total Tips Shared: </span>
								<span className='text-secondary'>{g.totalTipsShared}</span>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}

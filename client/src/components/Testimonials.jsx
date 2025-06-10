// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import dummyImage from '/user.png';

const testimonials = [
	{
		id: 1,
		name: 'Sarah Thompson',
		role: 'Urban Gardener',
		text: 'This platform transformed my balcony into a thriving herb garden! The community support and expert tips helped me grow fresh ingredients right in my apartment.',
		avatar: 'https://i.pravatar.cc/150?img=31',
	},
	{
		id: 2,
		name: 'Michael Chen',
		role: 'Hydroponics Enthusiast',
		text: "I've doubled my vegetable yield using techniques learned here. The active gardeners community is incredibly knowledgeable and supportive.",
		avatar: 'https://i.pravatar.cc/150?img=50',
	},
	{
		id: 3,
		name: 'Priya Patel',
		role: 'Community Garden Leader',
		text: 'Our neighborhood garden flourished after implementing composting methods shared on this platform. A must-join for serious gardeners!',
		avatar: 'https://i.pravatar.cc/150?img=60',
	},
];

const Testimonials = () => {
	return (
		<section className='py-16 bg-base-200 dark:bg-base-300'>
			<div className='section'>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-4xl font-bold text-center mb-12'
				>
					🌻 Community Voices
				</motion.h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.id}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1, duration: 0.4 }}
							className='card bg-base-100 shadow-lg'
						>
							<div className='card-body'>
								<p className='italic text-lg mb-4'>"{testimonial.text}"</p>
								<div className='flex items-center gap-4 mt-4'>
									<img
										src={testimonial.avatar || dummyImage}
										alt={testimonial.name}
										className='w-16 h-16 rounded-full object-cover border-2 border-primary'
									/>
									<div>
										<h3 className='text-xl font-semibold'>
											{testimonial.name}
										</h3>
										<p className='text-sm text-secondary'>{testimonial.role}</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;

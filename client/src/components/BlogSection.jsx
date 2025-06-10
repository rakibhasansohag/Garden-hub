// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import blog1 from '/blog-1.jpg';
import blog2 from '/blog-2.jpg';
import blog3 from '/blog-3.jpg';

const blogs = [
	{
		id: 1,
		title: 'Urban Gardening Essentials',
		excerpt:
			'Discover how to create thriving green spaces in small urban areas...',
		date: 'March 15, 2024',
		image: blog1,
		readTime: '5 min read',
	},
	{
		id: 2,
		title: 'Composting 101',
		excerpt:
			'Transform your kitchen waste into garden gold with our simple guide...',
		date: 'March 18, 2024',
		image: blog2,
		readTime: '8 min read',
	},
	{
		id: 3,
		title: 'Hydroponics Basics',
		excerpt: 'Learn soil-free gardening techniques for year-round harvests...',
		date: 'March 20, 2024',
		image: blog3,
		readTime: '6 min read',
	},
];

const BlogSection = () => {
	return (
		<section className='py-16'>
			<div className='section'>
				<motion.h2
					initial={{ opacity: 0, y: -40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-4xl font-bold text-center mb-2'
				>
					📖 Latest Blogs
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-xl font-semibold text-center mb-12 capitalize'
				>
					Learn more about gardening by reading some of our short blogs
				</motion.p>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{blogs.map((blog, index) => (
						<motion.div
							key={blog.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.6 }}
							viewport={{ once: true }}
							className='card bg-base-100 dark:bg-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300'
						>
							<figure className='relative h-48 overflow-hidden'>
								<motion.img
									src={blog.image}
									alt={blog.title}
									className='w-full h-full object-cover'
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								/>
								<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
									<span className='text-sm text-white'>{blog.date}</span>
								</div>
							</figure>

							<div className='card-body'>
								<h3 className='card-title text-2xl mb-2'>{blog.title}</h3>
								<p className=' mb-4'>{blog.excerpt}</p>
								<div className='flex justify-between items-center mt-auto'>
									<span className='badge badge-secondary badge-lg'>
										{blog.readTime}
									</span>
									<motion.button
										whileHover={{ scale: 1.05 }}
										className='btn btn-primary rounded-full px-6'
									>
										Read More
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;

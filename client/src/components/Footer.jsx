import { Link, NavLink } from 'react-router';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
	const contactUs = [
		{
			name: 'rakibhasansohag133@gmail.com',
			to: 'mailto:info@tbgardening.com',
		},
		{ name: '01760169982', to: 'tel:+8801760169982' },
		{ name: 'Wa - 01760169982', to: 'https://wa.me/8801760169982' },
	];

	const terms = ['Terms of Service', 'Privacy Policy', 'Disclamier'];

	return (
		<footer className='bg-base-100 py-12 dark:bg-base-300 '>
			<div className='section'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
					{/* Column 1: Site Branding */}
					<div>
						<Link to='/' className='inline-flex items-center gap-2'>
							<span className='text-2xl font-bold text-primary '>
								GardenHub
							</span>
						</Link>
						<p className='mt-4 font-semibold tracking-wide  '>
							Your gardening companion. Connect with fellow plant lovers, share
							cultivation tips, and grow together. Explore seasonal guides,
							expert advice, and community-driven gardening solutions for every
							space and skill level.
						</p>
					</div>

					{/* Column 2: Quick Links */}
					<div>
						<h4 className='font-bold mb-2 text-xl dark:text-primary'>
							Quick Links
						</h4>
						<ul className='space-y-1'>
							{['Home', 'Explore Gardeners', 'Browse Tips', 'Contact'].map(
								(page) => (
									<li key={page}>
										<NavLink
											to={
												page === 'Home'
													? '/'
													: `/${page.toLowerCase().replace(' ', '-')}`
											}
											className={({ isActive }) =>
												`block text-sm hover:text-secondary transition dark:hover:text-accent ${
													isActive
														? 'text-secondary dark:text-accent font-bold'
														: ''
												}`
											}
										>
											{page}
										</NavLink>
									</li>
								),
							)}
						</ul>
					</div>

					{/* Column 3: Contact Information */}
					<div>
						<h4 className='font-semibold mb-2 text-lg dark:text-primary'>
							Contact Us
						</h4>
						<ul className='space-y-1'>
							{contactUs.map((gardener, index) => (
								<li key={index}>
									<Link
										to={gardener.to}
										className='block text-sm transition-all duration-300 hover:scale-105 hover:text-secondary dark:hover:text-accent py-1'
									>
										{gardener.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 4: Gardening Terms */}
					<div>
						<h4 className='font-semibold mb-2 text-lg dark:text-primary'>
							Terms & Policies
						</h4>
						<ul className='space-y-1'>
							{terms.map((topic, index) => (
								<li key={index}>
									<Link
										to={`/topics/${topic.toLowerCase()}`}
										className='block text-base transition-all duration-300 hover:scale-105 hover:text-secondary dark:hover:text-accent cursor-pointer'
									>
										{topic}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Social icons */}
				<div className='flex justify-center gap-6 mt-8 text-primary '>
					<Link
						to='https://www.facebook.com/rakibhasansohag133/'
						target='_blank'
						rel='noopener noreferrer'
						className='transition-all duration-300 hover:scale-105 cursor-pointer'
					>
						<FaFacebook size={25} />
					</Link>
					<Link
						to='https://www.instagram.com/rakibhasansohag133'
						target='_blank'
						rel='noopener noreferrer'
						className='transition-all duration-300 hover:scale-105 cursor-pointer'
					>
						<BsInstagram size={25} />
					</Link>
					<Link
						to='https://www.linkedin.com/in/rakib-hasan-sohag/'
						target='_blank'
						rel='noopener noreferrer'
						className='transition-all duration-300 hover:scale-105 cursor-pointer'
					>
						<BsLinkedin size={25} />
					</Link>
					<Link
						to='https://github.com/rakibhasansohag'
						target='_blank'
						rel='noopener noreferrer'
						className='transition-all duration-300 hover:scale-105 cursor-pointer'
					>
						<BsGithub size={25} />
					</Link>
				</div>

				{/* Bottom credit */}
				<div className='mt-6 text-center text-lg font-semibold dark:text-primary'>
					© {new Date().getFullYear()} GardenHub. All rights reserved.
					<br />
					Made with ❤️ by{' '}
					<Link
						to='https://github.com/rakibhasansohag'
						target='_blank'
						rel='noopener noreferrer'
						className="relative text-secondary dark:text-accent font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-secondary dark:after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
					>
						Rakib Hasan Sohag
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

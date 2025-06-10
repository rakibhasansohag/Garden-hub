import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import dummyImage from '/user.png';
import { AuthContext } from '../context/AuthContext';
import NavItem from './NavItem';

const Header = () => {
	const { user, logOut } = use(AuthContext);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleLogOut = () => {
		logOut()
			.then(() => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Log out successfully',
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((err) => {
				// console.log(err);
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: err.message,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};

	const avatarSrc = user?.photoURL || dummyImage;

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		const prefersDark = storedTheme === 'dark';
		document.documentElement.setAttribute(
			'data-theme',
			prefersDark ? 'dark' : 'light',
		);
		setIsDarkMode(prefersDark);
	}, []);

	const toggleTheme = () => {
		const newTheme = isDarkMode ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		setIsDarkMode(!isDarkMode);
	};

	const navLinks = [
		{ to: '/', label: 'Home' },
		{ to: '/explore-gardeners', label: 'Explore Gardeners' },
		{ to: '/tips', label: 'Browse Tips' },
		{ to: '/share-tips', label: 'Share a Garden Tip', protected: true },
		{ to: '/my-tips', label: 'My Tips', protected: true },
	];

	// Error AFter auth implemetned we will work  on eht hiding the protected links
	const visibleLinks = navLinks.filter((link) => !link.protected || user);

	return (
		<section className='sticky top-0 z-50 bg-base-300'>
			<div className='navbar lg:gap-8 gap-2 section'>
				<div className='navbar-start flex-1'>
					{/* Mobile menu */}
					<div className='dropdown'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost lg:hidden px-0 pr-0.5 md:pr-4 transition duration-200 hover:scale-110'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
						>
							{visibleLinks.map(({ to, label }) => (
								<li key={to}>
									<NavItem to={to}>{label}</NavItem>
								</li>
							))}
						</ul>
					</div>

					{/* Logo */}
					<Link
						to='/'
						className='flex gap-2 items-center py-2 rounded-lg text-white justify-start transition duration-200 hover:scale-105'
					>
						<span className='text-2xl sm:text-3xl text-primary font-bold'>
							GardenHub
						</span>
					</Link>
				</div>

				{/* Desktop menu */}
				<div className='navbar-center hidden lg:flex justify-center'>
					<ul className='menu menu-horizontal px-1 gap-4'>
						{visibleLinks.map(({ to, label }) => (
							<li key={to}>
								<NavItem to={to}>{label}</NavItem>
							</li>
						))}
					</ul>
				</div>

				{/* Right section */}
				<div className='navbar-end gap-3 items-center w-auto'>
					<div className='flex gap-3'>
						{!user ? (
							<>
								<Link to='/auth/register' className='hidden md:block'>
									<button className='btn btn-outline rounded-xl transition duration-300 hover:scale-11 0'>
										Register
									</button>
								</Link>
								<Link to='/auth/login'>
									<button className='btn btn-primary rounded-xl transition duration-300 hover:scale-110'>
										Login
									</button>
								</Link>
							</>
						) : (
							<div className='dropdown dropdown-end'>
								<label
									tabIndex={0}
									className='btn btn-ghost btn-circle avatar transition duration-300 hover:scale-110'
								>
									<div
										className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'
										data-tooltip-id='user-tooltip'
										data-tooltip-content={user.displayName || 'User'}
									>
										<img
											src={avatarSrc}
											alt='User avatar'
											className='cursor-pointer'
										/>
									</div>
								</label>
								<Tooltip
									id='user-tooltip'
									place='bottom'
									variant='dark'
									delayShow={300}
									delayHide={100}
								/>
								<ul
									tabIndex={0}
									className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
								>
									<li>
										<Link to='/profile'>View Profile</Link>
									</li>
									<li>
										<button onClick={handleLogOut}>Logout</button>
									</li>
								</ul>
							</div>
						)}
					</div>

					{/* Theme toggle */}
					<label className='toggle text-base-content'>
						<input
							type='checkbox'
							value='synthwave'
							className='theme-controller'
							onChange={toggleTheme}
							checked={isDarkMode}
						/>
						<svg
							aria-label='sun'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<g
								strokeLinejoin='round'
								strokeLinecap='round'
								strokeWidth='2'
								fill='none'
								stroke='currentColor'
							>
								<circle cx='12' cy='12' r='4'></circle>
								<path d='M12 2v2'></path>
								<path d='M12 20v2'></path>
								<path d='m4.93 4.93 1.41 1.41'></path>
								<path d='m17.66 17.66 1.41 1.41'></path>
								<path d='M2 12h2'></path>
								<path d='M20 12h2'></path>
								<path d='m6.34 17.66-1.41 1.41'></path>
								<path d='m19.07 4.93-1.41 1.41'></path>
							</g>
						</svg>
						<svg
							aria-label='moon'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<g
								strokeLinejoin='round'
								strokeLinecap='round'
								strokeWidth='2'
								fill='none'
								stroke='currentColor'
							>
								<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
							</g>
						</svg>
					</label>
				</div>
			</div>
		</section>
	);
};

export default Header;
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import Loading from '../components/Loading';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { useStaticTitle } from '../lib/utils';

const Login = () => {
	useStaticTitle();

	const [error, setError] = useState('');
	const [email, setEmail] = useState('');

	const {
		user,
		setUser,
		signIn,
		loading: isLoading,
		googleLogin,
	} = useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		setLoading(true);

		const form = e.target;

		const email = form.email.value.trim();

		const password = form.password.value.trim();

		signIn(email, password)
			.then((result) => {
				Swal.fire({
					title: `User Login successfully`,
					icon: 'success',
					timer: '1500',
				});
				const loggedUser = result.user;
				setUser(loggedUser);
				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				setLoading(false);
				Swal.fire({
					title: `Something went wrong ${error.message}`,
					icon: 'error',
					timer: '1500',
				});
				setError(err.code);
			})
			.finally(() => setLoading(false));
	};

	const handleGoogleLogin = () => {
		setLoading(true);
		googleLogin()
			.then((result) => {
				Swal.fire({
					title: `User Login successfully`,
					icon: 'success',
					timer: '1500',
				});
				const loggedUser = result.user;
				setUser(loggedUser);
				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				Swal.fire({
					title: `Something went wrong ${error.message}`,
					icon: 'warning',
					timer: '1500',
				});
				setError(err.code);
			})
			.finally(() => setLoading(false));
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	useEffect(() => {
		if (!isLoading && user) {
			Swal.fire({
				title: `You are already logged in. Please logout first.`,
				icon: 'error',
				timer: '1500',
			});
			navigate(location.state?.from?.pathname || '/', { replace: true });
		}
	}, [user, navigate, location.state, isLoading]);

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	return (
		<div className='flex justify-center items-center py-12'>
			<div className='card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl pt-10 pb-4'>
				<h2 className='font-semibold text-2xl text-center'>
					Login Your account
				</h2>
				<form onSubmit={handleLogin} className='card-body'>
					<fieldset className='fieldset'>
						{/* Email */}
						<label className='label' htmlFor='email'>
							Email
						</label>
						<input
							id='email'
							type='email'
							name='email'
							className='input'
							placeholder='Email'
							required
							autoComplete='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* Password */}
						<div className='relative'>
							{/* Password */}
							<label htmlFor='password' className='label'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type={showPassword ? 'text' : 'password'}
								className='input '
								placeholder='Password'
								required
							/>
							<button
								type='button'
								onClick={handleTogglePassword}
								className='absolute inset-y-1 top-5 right-5 sm:right-8 flex items-center text-xl text-gray-500 cursor-pointer z-10'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						<div>
							<Link
								to={'/auth/forget-password'}
								state={{ email: email || '' }}
								className='link link-hover'
							>
								Forgot password?
							</Link>
						</div>
						{error && <p className='text-red-500'>{error}</p>}

						<button
							type='submit'
							className='btn btn-primary mt-4 tracking-widest font-bold text-lg'
						>
							{loading ? (
								<span>
									Logging...<span className='loading loading-spinner'></span>{' '}
								</span>
							) : (
								'Login'
							)}
						</button>

						<div className='mt-4 '>
							Don't Have An Account ?
							<Link to={'/auth/register'} className='link link-hover font-bold'>
								{' '}
								Register
							</Link>
						</div>
					</fieldset>
				</form>
				<div className='border-t border-base-100 pt-5 mt-0'>
					<div className='card-body mt-0 pt-0'>
						<h2 className='font-semibold text-md mb-3'>Or Continue With</h2>
						{/* Google */}
						<button
							className='btn bg-white text-black border-[#e5e5e5]'
							onClick={handleGoogleLogin}
						>
							<svg
								aria-label='Google logo'
								width='16'
								height='16'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
							>
								<g>
									<path d='m0 0H512V512H0' fill='#fff'></path>
									<path
										fill='#34a853'
										d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341'
									></path>
									<path
										fill='#4285f4'
										d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57'
									></path>
									<path
										fill='#fbbc02'
										d='m90 341a208 200 0 010-171l63 49q-12 37 0 73'
									></path>
									<path
										fill='#ea4335'
										d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55'
									></path>
								</g>
							</svg>
							{loading ? (
								<span>
									Logging...<span className='loading loading-spinner'></span>{' '}
								</span>
							) : (
								'Login With Google'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

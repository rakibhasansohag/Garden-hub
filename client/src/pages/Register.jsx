import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import Swal from 'sweetalert2';

import Loading from '../components/Loading';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { useStaticTitle } from '../lib/utils';

const Register = () => {
	useStaticTitle();

	const [nameError, setNameError] = useState('');
	const {
		createUser,
		setUser,
		updateUser,
		user,
		loading: isLoading,
		googleLogin,
	} = useContext(AuthContext);

	const [passwordError, setPasswordError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const passwordRegex = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
	);

	const handleNameChange = (e) => {
		const val = e.target.value.trim();
		if (nameError && val.length >= 3) setNameError('');
	};

	const handlePasswordChange = (e) => {
		const val = e.target.value;

		if (passwordError && passwordRegex.test(val)) setPasswordError('');
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const name = form.name.value.trim();

		if (name.length < 3) {
			setLoading(false);
			setNameError('Name must be at least 3 characters');
			return;
		}

		const photo = form.photo.value.trim();
		const email = form.email.value.trim();
		const password = form.password.value.trim();

		if (!passwordRegex.test(password)) {
			setLoading(false);
			setPasswordError(
				'Password must be at least 6 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
			);
			return;
		}

		createUser(email, password)
			.then((result) => {
				const createdUser = result.user;
				// console.log(result);
				updateUser({ displayName: name, photoURL: photo })
					.then(() => {
						setUser({ ...createdUser, displayName: name, photoURL: photo });
						fetch(`${import.meta.env.VITE_BASE_URL}/gardeners`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								name,
								email,
								photoURL: photo,
								age: null,
								gender: null,
								status: 'inactive',
								experiences: [],
								totalTipsShared: 0,
								creationTime: result.user?.metadata?.creationTime,
								lastSignInTime: result.user?.metadata?.lastSignInTime,
								loginMethod: result.user?.providerData[0]?.providerId,
								uid: result.user?.uid,
								phoneNumber: null,
							}),
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.insertedId) {
									Swal.fire({
										title: `User created successfully ${name}`,
										icon: 'success',
										timer: '1500',
									});
								}
							});
						navigate(`${location.state || '/'}`);
					})
					.catch((error) => {
						setLoading(false);
						Swal.fire({
							title: `Something went wrong ${error}`,
							icon: 'error',
							timer: '1500',
						});
						setUser(createdUser);
						navigate(`${location.state || '/'}`);
					})
					.finally(() => {
						setLoading(false);
					});
			})
			.catch((err) => {
				setLoading(false);
				Swal.fire({
					title: `Something went wrong ${err}`,
					icon: 'error',
					timer: '1500',
				});
			});
	};

	const handleGoogleLogin = () => {
		setLoading(true);
		googleLogin()
			.then(({ user: gUser }) => {
				const loggedUser = gUser;
				setUser(loggedUser);
				// console.log(gUser);
				const payload = {
					name: gUser.displayName,
					email: gUser.email,
					photoURL: gUser.photoURL,
					age: null,
					gender: null,
					status: 'inactive',
					experiences: [],
					totalTipsShared: 0,
					uid: gUser.uid,
					creationTime: gUser.metadata.creationTime,
					lastLoginTime: gUser.metadata.lastSignInTime,
					loginMethod: gUser?.providerData[0]?.providerId,
				};
				// console.log(payload);
				fetch(`${import.meta.env.VITE_BASE_URL}/gardeners`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.insertedId) {
							Swal.fire({
								title: `User Login successfully ${gUser.displayName}`,
								icon: 'success',
								timer: '1500',
							});
						}
					});

				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				setLoading(false);
				Swal.fire({
					title: `Something went wrong ${err.message}`,
					icon: 'error',
					timer: '1500',
				});
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (!isLoading && user) {
			Swal.fire({
				title: `You are already logged in. Please logout first.`,
				icon: 'warning',
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
			<div className='card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl py-10'>
				<h2 className='font-semibold text-2xl text-center'>
					Register Your account
				</h2>
				<form className='card-body' onSubmit={handleRegister}>
					<fieldset className='fieldset space-y-2'>
						<div>
							{/* Name */}
							<label className='label' htmlFor='name'>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								className='input'
								placeholder='Name'
								required
								onChange={handleNameChange}
							/>
						</div>

						<div>
							{/* Email */}
							<label className='label' htmlFor='photo'>
								Photo URL
							</label>
							<input
								id='photo'
								type='text'
								name='photo'
								className='input'
								placeholder='Photo Url...'
							/>
						</div>

						<div>
							{/* Email */}
							<label className='label' htmlFor='email'>
								Email
							</label>
							<input
								id='email'
								type='email'
								name='email'
								className='input'
								required
								placeholder='Email'
							/>
						</div>

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
								onChange={handlePasswordChange}
							/>
							<button
								type='button'
								onClick={handleTogglePassword}
								className='absolute inset-y-1 top-5 right-5 sm:right-8 flex items-center text-xl text-gray-500 cursor-pointer z-10'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						{nameError && <p className='text-error'>{nameError}</p>}
						{passwordError && <p className='text-error'>{passwordError}</p>}

						<button
							type='submit'
							className='btn btn-primary mt-4 font-bold tracking-widest'
						>
							{loading ? (
								<span>
									Registering...{' '}
									<span className='loading loading-spinner'></span>{' '}
								</span>
							) : (
								'Register'
							)}
						</button>
						<div className='mt-4'>
							Already Have An Account ?
							<Link to={'/auth/login'} className='link link-hover font-bold'>
								{' '}
								Login
							</Link>
						</div>
					</fieldset>
				</form>
				<div className='border-t border-base-100 mt-0'>
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

export default Register;

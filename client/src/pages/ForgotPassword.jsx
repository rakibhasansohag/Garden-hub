import { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useStaticTitle } from '../lib/utils';

const ForgotPassword = () => {
	useStaticTitle();

	const location = useLocation();
	const navigate = useNavigate();
	const { sendPasswordResetEmailHelper } = use(AuthContext);

	const [email, setEmail] = useState(location.state?.email || '');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email) {
			Swal.fire({
				title: 'Please enter your email',
				icon: 'error',
				timer: 1500,
			});
			return;
		}
		setLoading(true);
		sendPasswordResetEmailHelper(email)
			.then(() => {
				Swal.fire({
					title: 'Password reset email sent!',
					icon: 'success',
					timer: 2500,
				});
				setTimeout(
					() => window.open('https://mail.google.com', '_blank'),
					1000,
				);
			})
			.catch((err) => {
				Swal.fire({
					title: err.message,
					icon: 'error',
					timer: 1500,
				});
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className=' flex items-center justify-center bg-base-200 py-16 px-4'>
			<motion.div
				className='card bg-base-300 w-full max-w-md shadow-2xl px-6 py-16 relative overflow-hidden'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<motion.div
					className='absolute top-10 left-1/2 transform -translate-x-1/2'
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
				>
					<FaEnvelopeOpenText size={64} className='text-secondary' />
				</motion.div>

				<h2 className='text-3xl font-bold text-center mt-16 mb-6'>
					Forgot Password
				</h2>

				<form onSubmit={handleSubmit} className='space-y-6 text-left'>
					<motion.div
						className='flex flex-col space-y-2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<motion.label htmlFor='email' className='font-semibold text-lg'>
							Email
						</motion.label>
						<motion.input
							id='email'
							type='email'
							className='input input-bordered w-full text-left'
							placeholder='your-email@example.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							whileFocus={{ borderColor: '#3A6B7E', scale: 1.02 }}
							transition={{ type: 'spring', stiffness: 300 }}
						/>
					</motion.div>

					<motion.button
						type='submit'
						className='btn btn-primary w-full'
						disabled={loading}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 200 }}
					>
						{loading ? (
							<>
								<span className='loading loading-spinner'></span> Sending...
							</>
						) : (
							'Reset Password'
						)}
					</motion.button>
				</form>

				<motion.div
					className='mt-6 text-center space-x-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
				>
					<button
						onClick={() => navigate(-1)}
						className='link transition-colors hover:text-secondary hover:underline'
					>
						← Back to Login
					</button>
					<Link
						to='/auth/register'
						className='link transition-colors hover:text-secondary hover:underline'
					>
						Register →
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;

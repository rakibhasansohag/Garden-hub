import { NavLink } from 'react-router';

const NavItem = ({ to, children, onClick }) => {
	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={`relative inline-block px-2 py-1 text-base transition-colors duration-300 bg-transparent rounded-lg group hover:text-primary `}
		>
			<span className='relative group'>
				<span className='relative z-10'>{children}</span>
				<span className='absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full'></span>
			</span>
		</NavLink>
	);
};

export default NavItem;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slide1 from '/slide-1.jpg';
import slide2 from '/slide-2.jpg';
import slide3 from '/slide-3.webp';

const Hero = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const generateEvents = () => {
			const eventTemplates = [
				{
					title: 'Spring Gardening Workshop',
					location: 'Community Garden Center',
					description: 'Learn seasonal planting techniques from experts',
					image: slide1,
				},
				{
					title: 'Urban Farming Expo',
					location: 'City Convention Hall',
					description: 'Discover innovative small-space gardening solutions',
					image: slide2,
				},
				{
					title: 'Organic Composting Seminar',
					location: 'Eco Park Amphitheater',
					description: 'Master the art of natural fertilizer production',
					image: slide3,
				},
			];

			const eventsWithDates = eventTemplates.map((event) => ({
				...event,
				date: new Date(
					Date.now() + Math.floor(Math.random() * 25 + 1) * 86400000,
				),
			}));

			setEvents(eventsWithDates);
		};

		generateEvents();
	}, []);

	return (
		<section className='relative h-[90vh] w-full'>
			<Swiper
				modules={[Autoplay, Navigation, Pagination]}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				pagination={{
					clickable: true,
					el: '.swiper-pagination',
					type: 'bullets',
				}}
				loop={true}
				speed={800}
				className='h-full w-full'
			>
				<div className='swiper-button-prev'></div>
				<div className='swiper-button-next'></div>
				{events.map((event, index) => (
					<SwiperSlide key={index}>
						<SlideContent event={event} activeIndex={index} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Hero;

const SlideContent = ({ event }) => {
	return (
		<div
			className='relative h-full w-full bg-cover bg-center'
			style={{ backgroundImage: `url(${event.image})` }}
		>
			<div className='absolute inset-0 bg-black/40' />

			<div className='relative h-full flex items-center justify-center text-center'>
				<div className='max-w-4xl px-4 text-white'>
					<h2 className='text-4xl md:text-6xl font-bold mb-4'>{event.title}</h2>

					<div className='space-y-2 mb-6'>
						<p className='text-xl md:text-2xl'>📍 {event.location}</p>
						<p className='text-lg md:text-xl'>
							📅{' '}
							{event.date.toLocaleDateString('en-US', {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</div>

					<p className='text-lg md:text-xl italic mb-8'>{event.description}</p>

					<div className='flex justify-center gap-4'>
						<button className=' border-dashed border-2  border-secondary text-white px-8 py-3 rounded-md text-lg hover:bg-primary cursor-pointer transition-colors duration-300 font-semibold tracking-wide'>
							Register Now
						</button>
						<button className=' border-dashed border-2  border-secondary text-white px-8 py-3 rounded-md text-lg hover:bg-primary cursor-pointer transition-colors duration-300'>
							Learn More
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

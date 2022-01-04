import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function EventsPage({ events }) {
	console.log(events)
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No Events Available Currently</h3>}

			{events.map((event) => (
				<EventItem key={event.id} event={event} />
			))}
		</Layout>
	)
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events`)
	const events = await res.json()

	return {
		props: { events },
		revalidate: 1,
	}
}

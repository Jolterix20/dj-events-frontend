import qs from 'qs'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function SearchPage({ events }) {
	// console.log(events)

	const router = useRouter()

	return (
		<Layout title="Search Events">
			<Link href="/events">Go Back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No Events Available Currently</h3>}

			{events.map((event) => (
				<EventItem key={event.id} event={event} />
			))}
		</Layout>
	)
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
			],
		},
	})

	const res = await fetch(`${API_URL}/events?${query}`)
	const events = await res.json()

	return {
		props: { events },
	}
}

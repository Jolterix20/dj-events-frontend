import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({ evt }) {
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)
	const [loading, setLoading] = useState(true)
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '500px',
		latitude: 40.712772,
		longitude: -73.935242,
		zoom: 12,
	})

	useEffect(() => {
		fetch(
			`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.NEXT_PUBLIC_MAPQUEST_API_KEY}&location=${evt.address}`
		)
			.then((response) => response.json())
			.then((result) => {
				const { lat, lng } = result.results[0].locations[0].latLng
				setLat(lat)
				setLng(lng)
				setViewport({ ...viewport, latitude: lat, longitude: lng })
				setLoading(false)
			})
			.catch((error) => console.log('error', error))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) return false

	// console.log(lat, lng)

	return (
		<ReactMapGl
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
			onViewportChange={(vp) => setViewport(vp)}
		>
			<Marker key={evt.id} latitude={lat} longitude={lng}>
				<Image
					src="/images/pin.svg"
					width={30}
					height={30}
					alt="Marker"
				/>
			</Marker>
		</ReactMapGl>
	)
}

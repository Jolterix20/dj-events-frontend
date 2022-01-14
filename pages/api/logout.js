import cookie from 'cookie'
import { API_URL } from '@/config/index'

// GETting user details from strapi

export default async function (req, res) {
	if (req.method === 'POST') {
		// Destroy cookie
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: new Date(0),
				sameSite: 'strict',
				path: '/',
			})
		)
		res.status(200).json({ message: 'Success' })
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({ message: `Method ${req.method} is not allowed` })
	}
}

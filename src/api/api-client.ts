const API_URL = process.env.REACT_APP_API_URL

const client = (endpoint: string) => {
	const config = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}

	return window
		.fetch(new URL(`${API_URL}/${endpoint}`).toString(), config)
		.then(async (response) => {
			const data = await response.json()

			if (response.ok) {
				return data
			} else {
				return Promise.reject(data)
			}
		})
}

export default client

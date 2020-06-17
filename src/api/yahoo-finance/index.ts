import { Symbol } from "../../types"

export const search = async (value: string): Promise<Symbol | []> => {
	if (value.length > 0) {
		const res = await fetch(`http://localhost:8181/yf/api/finance/search?q=${value}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (res && res.status === 200) {
			const data = await res.json()
			return data.results
		} else {
			return []
		}
	} else {
		return []
	}
}

export const getFinanceInfo = async (symbol: string) => {
	const url = `http://localhost:8181/yf/api/finance/chart/${symbol}?region=GB&lang=en-GB&includePrePost=false&interval=2m&range=1d&corsDomain=uk.finance.yahoo.com&.tsrc=finance`

	try {
		const res = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (res && res.ok) {
			const data = await res.json()
			return data
		} else {
			console.log("There is an issue with the response")
			console.log(res)
		}
	} catch (err) {
		console.log("There has been an issue fetching stock information")
		console.error(err)
	}
}

export const getSummary = async (symbol: string) => {
	const url = `http://localhost:8181/yf/api/finance/quoteSummary/${symbol}`

	try {
		const res = await fetch(url, { headers: { "Content-Type": "application/json" } })

		if (res && res.ok) {
			const data = await res.json()
			return data
		} else {
			console.log("There is an issue with the response")
			console.log(res)
		}
	} catch (err) {
		console.log("There has been an issue fetching stock information")
		console.error(err)
	}
}

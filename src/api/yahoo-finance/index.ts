import { Symbol, SymbolSummary, FinanceInfo } from "../../types"

export const search = async (value: string): Promise<Symbol[] | null> => {
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
			return null
		}
	} else {
		return null
	}
}

export const getFinanceInfo = async (
	symbol: string,
	interval: string = "2m",
	range: string = "1d"
): Promise<FinanceInfo | null> => {
	const url = `http://localhost:8181/yf/api/finance/chart/${symbol}?region=GB&lang=en-GB&includePrePost=false&interval=${interval}&range=${range}&corsDomain=uk.finance.yahoo.com&.tsrc=finance`

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

			return null
		}
	} catch (err) {
		console.log("There has been an issue fetching stock information")
		console.error(err)

		return null
	}
}

export const getSummary = async (symbol: string): Promise<SymbolSummary | null> => {
	const url = `http://localhost:8181/yf/api/finance/quoteSummary/${symbol}`

	try {
		const res = await fetch(url, { headers: { "Content-Type": "application/json" } })

		if (res && res.ok) {
			const data = await res.json()
			return data as SymbolSummary
		} else {
			console.log("There is an issue with the response")
			console.log(res)

			return null
		}
	} catch (err) {
		console.log("There has been an issue fetching stock information")
		console.error(err)

		return null
	}
}

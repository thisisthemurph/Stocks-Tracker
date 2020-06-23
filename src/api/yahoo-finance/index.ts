import { Symbol, SymbolSummary, FinanceInfo } from "../../types"
import client from "../api-client"

export const search = async (value: string): Promise<Symbol[] | null> => {
	if (value.length > 0) {
		try {
			const data = await client(`finance/search?q=${encodeURIComponent(value)}`)
			return data.results
		} catch (err) {
			console.error("There has been an issue obtaining search data")
			console.error(err)
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
	try {
		const url = `finance/chart/${symbol}?region=GB&lang=en-GB&includePrePost=false&interval=${interval}&range=${range}&corsDomain=uk.finance.yahoo.com&.tsrc=finance`
		return client(url)
	} catch (err) {
		console.log("There has been an issue fetching stock information")
		console.error(err)
		return null
	}
}

export const getSummary = async (symbol: string): Promise<SymbolSummary | null> => {
	try {
		return client(`finance/quoteSummary/${symbol}`)
	} catch (err) {
		console.log("There has been an issue fetching summary information")
		console.log(err)
		return null
	}
}

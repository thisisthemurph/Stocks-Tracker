export interface Symbol {
	exchange: string
	shortname: string
	quoteType: string
	symbol: string
	index: string
}

interface TradingPeriod {
	timezone: string
	start: number
	end: number
	gmtoffset: number
}

interface Quote {
	open: number[]
	high: number[]
	low: number[]
	close: number[]
	volume: number[]
}

export interface ChartResult {
	meta: {
		currency: string
		symbol: string
		exchangeName: string
		instrumentType: string
		firstTradeDate: number
		regularMarketTime: number
		gmtoffset: number
		timezone: string
		exchangeTimezoneName: string
		regularMarketPrice: number
		chartPreviousClose: number
		previousClose: number
		scale: number
		priceHint: number
		currentTradingPeriod: {
			pre: TradingPeriod
			regular: TradingPeriod
			post: TradingPeriod
		}
		// tradingPeriods
		dataGranularity: string
		range: string
		validRanges: string[]
	}
	timesatmp: number[]
	indicators: {
		quote: Array<Quote>
	}
}

export interface FinanceInfo {
	chart: {
		result: ChartResult[]
	}
}

interface MultiFormatNumber {
	raw: number
	fmt: string
	longFmt?: string
}

export interface SymbolSummary {
	summaryProfile: {
		address1: string
		city: string
		state: string
		zip: string
		country: string
		phone: string
		website: string
		industry: string
		sector: string
		longBusinessSummary: string
	}
	financialData: {
		maxAge: number
		currentPrice: MultiFormatNumber
		targetHighPrice: MultiFormatNumber
		targetLowPrice: MultiFormatNumber
		targetMeanPrice: MultiFormatNumber
		targetMedianPrice: MultiFormatNumber
		recommendationMean: MultiFormatNumber
		recommendationKey: string
		numberOfAnalystOpinions: MultiFormatNumber
		totalCash: MultiFormatNumber
		totalCashPerShare: MultiFormatNumber
		ebitda: MultiFormatNumber
		totalDebt: MultiFormatNumber
		quickRatio: MultiFormatNumber
		currentRatio: MultiFormatNumber
		totalRevenue: MultiFormatNumber
		debtToEquity: MultiFormatNumber
		revenuePerShare: MultiFormatNumber
		returnOnAssets: MultiFormatNumber
		returnOnEquity: MultiFormatNumber
		grossProfits: MultiFormatNumber
		freeCashflow: MultiFormatNumber
		operatingCashflow: MultiFormatNumber
		earningsGrowth: MultiFormatNumber
		revenueGrowth: MultiFormatNumber
		grossMargins: MultiFormatNumber
		ebitdaMargins: MultiFormatNumber
		operatingMargins: MultiFormatNumber
		profitMargins: MultiFormatNumber
		financialCurrency: string
	}
}

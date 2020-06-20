import React from "react"
import { Symbol } from "../../types"

interface FinanceHeaderProps {
	company: Symbol
	currency: string
	currentPrice: string
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({
	company,
	currency,
	currentPrice,
}: FinanceHeaderProps) => {
	return (
		<div className="finance-header container">
			<h1 className="finance-header__heading">
				{company.shortname} ({company.symbol})
			</h1>
			<p className="finance-header__subheading">
				Exchange: {company.exchange} - Currency is {currency}
			</p>
			<p className="finance-header__current-price">{currentPrice}</p>
		</div>
	)
}

export default FinanceHeader

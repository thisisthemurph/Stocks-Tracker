import React from "react"

interface FinanceStatsProps {
	previousClose: number
	open: number
}

const FinanceStats: React.FC<FinanceStatsProps> = ({ previousClose, open }: FinanceStatsProps) => {
	return (
		<div className="finance-stats">
			<p>Previous close: {previousClose}</p>
			<p>Open: {open}</p>
		</div>
	)
}

export default FinanceStats

import React from "react"

interface FinanceStatsProps {
	previousClose: number
	open: number
}

const FinanceStats: React.FC<FinanceStatsProps> = ({ previousClose, open }: FinanceStatsProps) => {
	return (
		<div className="finance-stats container">
			<div className="finance-stats__col">
				<span className="finance-stats__row">
					<strong className="finance-stats__heading">Previous close: </strong>
					{previousClose}
				</span>
			</div>
			<div className="finance-stats__col">
				<span className="finance-stats__row">
					<strong className="finance-stats__heading">Open: </strong>
					{open}
				</span>
			</div>
		</div>
	)
}

export default FinanceStats

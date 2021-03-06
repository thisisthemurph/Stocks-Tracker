import React from "react"

interface FinanceStatsProps {
	previousClose: number
	open: number | null
}

const FinanceStats: React.FC<FinanceStatsProps> = ({ previousClose, open }: FinanceStatsProps) => {
	return (
		<div className="finance-stats data-table container">
			<div className="data-table__col">
				<span className="data-table__row">
					<strong className="data-table__heading">Previous close: </strong>
					{previousClose ? previousClose.toFixed(2) : "none"}
				</span>
			</div>
			<div className="data-table__col">
				<span className="data-table__row">
					<strong className="data-table__heading">Open: </strong>
					{open ? open.toFixed(2) : "none"}
				</span>
			</div>
		</div>
	)
}

export default FinanceStats

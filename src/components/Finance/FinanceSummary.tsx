import React from "react"
import { SymbolSummary } from "../../types"

interface SummaryProps {
	summary: SymbolSummary
}

const FinanceSummary: React.FC<SummaryProps> = ({ summary }: SummaryProps) => {
	return (
		<>
			<div className="finance-summary container">
				<h2>Company information</h2>
				<div className="data-table">
					<div className="data-table__col">
						<span className="data-table__row">
							<strong>Industry:</strong> {summary.summaryProfile.industry}
						</span>
					</div>
					<div className="data-table__col">
						<span className="data-table__row">
							<strong>Sector:</strong> {summary.summaryProfile.sector}
						</span>
					</div>
				</div>
			</div>
			<div className="container">
				<h3>Description</h3>
				<p>{summary.summaryProfile.longBusinessSummary}</p>
			</div>
		</>
	)
}

export default FinanceSummary

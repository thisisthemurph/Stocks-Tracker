import React, { useRef, useLayoutEffect } from "react"
import { ChartResult } from "../../types"
import RangeButtons from "../RangeButtons"
import Chart from "chart.js"
import moment from "moment"

interface ChartProps {
	chartData: ChartResult
	setRange: React.Dispatch<React.SetStateAction<string>>
}

const FinanceChart: React.FC<ChartProps> = ({ chartData, setRange }: ChartProps) => {
	const canvas = useRef<HTMLCanvasElement>(null)

	const closeValues = chartData.indicators.quote[0].close.filter((close) => close)
	const timestamps: moment.Moment[] = chartData.timestamp
		.filter((ts, idx) => ts && chartData.indicators.quote[0].close[idx])
		.map((ts) => moment(ts * 1000))

	const data = timestamps.map((ts, idx) => ({
		x: ts,
		y: parseFloat(closeValues[idx].toFixed(2)),
	}))

	const validRanges = ["1d", "5d", "1mo", "6mo", "ytd", "1y", "5y", "max"]

	useLayoutEffect(() => {
		const ctx: CanvasRenderingContext2D | null = canvas.current
			? canvas.current.getContext("2d")
			: null

		if (ctx !== null) {
			new Chart(ctx, {
				type: "line",
				data: {
					labels: timestamps,
					datasets: [
						{
							data: data,
							borderColor: "rgba(105, 181, 120, 0.8)",
							borderWidth: 1,
							pointRadius: 0,
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								type: "time",
								ticks: {
									autoSkip: true,
								},
								gridLines: {
									display: false,
									drawBorder: false,
								},
							},
						],
						yAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
								},
							},
						],
					},
					tooltips: {
						mode: "x-axis",
					},
					elements: {
						line: {
							tension: 0,
						},
					},
				},
			})
		}
	})

	console.log(chartData.meta.validRanges)

	const btns = chartData.meta.validRanges
		.filter((range) => validRanges.includes(range))
		.map((range) => ({
			value: range,
			onClick: () => setRange(range),
		}))

	return (
		<div className="container">
			<canvas ref={canvas} className="finance-chart" />
			<RangeButtons buttons={btns} />
		</div>
	)
}

export default FinanceChart

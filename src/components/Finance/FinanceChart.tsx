import React, { useRef, useLayoutEffect } from "react"
import { ChartResult } from "../../types"
import Chart from "chart.js"
import moment from "moment"

interface ChartProps {
	chartData: ChartResult
}

const FinanceChart: React.FC<ChartProps> = ({ chartData }: ChartProps) => {
	const canvas = useRef<HTMLCanvasElement>(null)

	const timestamps: moment.Moment[] = chartData.timestamp.map((ts) => moment(ts * 1000))
	const data = timestamps.map((ts, idx) => ({
		x: ts,
		y: parseFloat(chartData.indicators.quote[0].close[idx].toFixed(2)),
	}))

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
							backgroundColor: "rgba(105, 181, 120, 0.8)",
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
					events: ["mousemove", "click"],
					hover: {
						axis: "x",
					},
				},
			})
		}
	})

	return (
		<div className="container">
			<canvas ref={canvas} className="finance-chart" />
		</div>
	)
}

export default FinanceChart

import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { ChartResult, ChartData } from "../../types"
import RangeButtons from "../RangeButtons"
import Chart from "chart.js"
import moment from "moment"

interface ChartProps {
	chartData: ChartResult
	range: string
	setRange: React.Dispatch<React.SetStateAction<string>>
}

const FinanceChart: React.FC<ChartProps> = ({ chartData, range, setRange }: ChartProps) => {
	const [chart, setChart] = useState<Chart | null>(null)
	const canvas = useRef<HTMLCanvasElement>(null)

	const validRanges = ["1d", "5d", "1mo", "6mo", "ytd", "1y", "5y", "max"]

	useEffect(() => {
		if (chart) {
			chart.data = {
				datasets: [
					{
						data: getChartData(),
						borderColor: "gold",
						borderWidth: 2,
						pointRadius: 0,
					},
				],
			}

			chart.update()
		}
	}, [range, chartData.meta.symbol])

	useLayoutEffect(() => {
		const ctx: CanvasRenderingContext2D | null = canvas.current
			? canvas.current.getContext("2d")
			: null

		if (ctx !== null) {
			createChart(ctx, getChartData())
		}
	}, [])

	const getChartData = (): ChartData[] => {
		const quotes = chartData.indicators.quote

		if (quotes.length > 0 && "close" in quotes[0]) {
			const closeValues = chartData.indicators.quote[0].close.filter((close) => close)
			const timestamps: moment.Moment[] = chartData.timestamp
				.filter((ts, idx) => ts && chartData.indicators.quote[0].close[idx])
				.map((ts) => moment(ts * 1000))

			const data: ChartData[] = timestamps.map((ts, idx) => ({
				x: ts,
				y: parseFloat(closeValues[idx].toFixed(2)),
			}))

			return data
		}

		return []
	}

	const createChart = (ctx: CanvasRenderingContext2D, data: ChartData[]) => {
		setChart(
			new Chart(ctx, {
				type: "line",
				data: {
					datasets: [
						{
							data: data,
							borderColor: "gold",
							borderWidth: 2,
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
		)
	}

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

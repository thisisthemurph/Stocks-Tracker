import React, { useEffect, useState, useRef } from "react"
import { ChartResult } from "../../types"
import Chart from "chart.js"
import moment from "moment"

interface Props {
	chartData: ChartResult
}

const SearchSymbolChart: React.FC<Props> = ({ chartData }: Props) => {
	const [chart, setChart] = useState<Chart | null>(null)
	const canvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (chartData) {
			const closeValues = chartData.indicators.quote[0].close.filter((close) => close)
			const timestamps: moment.Moment[] = chartData.timestamp
				.filter((ts, idx) => ts && chartData.indicators.quote[0].close[idx])
				.map((ts) => moment(ts * 1000))

			const data = timestamps.map((ts, idx) => ({
				x: ts,
				y: parseFloat(closeValues[idx].toFixed(2)),
			}))

			const ctx: CanvasRenderingContext2D | null = canvas.current
				? canvas.current.getContext("2d")
				: null

			if (ctx !== null) {
				setChart(
					new Chart(ctx, {
						type: "line",
						data: {
							datasets: [
								{
									data: data,
									borderColor: "#FFFFFF",
									backgroundColor: "transparent",
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
											display: false,
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
										ticks: {
											display: false,
										},
									},
								],
							},
							tooltips: {
								enabled: false,
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
		}
	}, [chartData])

	return <canvas className="search__chart" ref={canvas} height="25px" />
}
export default SearchSymbolChart

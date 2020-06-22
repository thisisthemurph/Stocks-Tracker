import React from "react"
import "./RangeButtons.scss"

interface Button {
	value: string
	onClick: () => void
}

interface RangeButtonsProps {
	buttons: Array<Button>
}

const RangeButtons: React.FC<RangeButtonsProps> = ({ buttons }: RangeButtonsProps) => {
	return (
		<div className="range-buttons">
			{buttons.map((btn) => (
				<button key={btn.value} className="range-buttons__button" onClick={btn.onClick}>
					{btn.value}
				</button>
			))}
		</div>
	)
}

export default RangeButtons

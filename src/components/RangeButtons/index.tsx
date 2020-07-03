import React, { useState } from "react"
import "./RangeButtons.scss"

interface Button {
	value: string
	onClick: () => void
}

interface RangeButtonsProps {
	buttons: Array<Button>
}

const RangeButtons: React.FC<RangeButtonsProps> = ({ buttons }: RangeButtonsProps) => {
	const [active, setActive] = useState("1d")

	return (
		<div className="range-buttons">
			{buttons.map((btn) => (
				<button
					key={btn.value}
					className={`range-buttons__button${
						active === btn.value ? " range-buttons__button--active" : ""
					}`}
					onClick={() => {
						btn.onClick()
						setActive(btn.value)
					}}
				>
					{btn.value}
				</button>
			))}
		</div>
	)
}

export default RangeButtons

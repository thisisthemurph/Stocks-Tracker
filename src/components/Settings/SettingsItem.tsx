import React from "react"
import { SettingsInput } from "./types"

const SettingsItem: React.FC<SettingsInput> = ({ label, input, info, handler }: SettingsInput) => {
	if (input.type === "select")
		return (
			<div className="settings__item">
				<label className="settings__label" htmlFor={label}>
					{label}:
				</label>
				<p className="settings__info">{info}</p>
				<select
					id={label}
					name={label}
					className="settings__input"
					value={input.value}
					onChange={handler}
				>
					{input.options?.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>
		)

	return (
		<div className="settings__item">
			<label className="settings__label" htmlFor={label}>
				{label}:
			</label>
			<p className="settings__info">{info}</p>
			<input
				id={label}
				name={label}
				className="settings__input"
				type={input.type}
				value={input.value}
				onChange={handler}
			/>
		</div>
	)
}

export default SettingsItem

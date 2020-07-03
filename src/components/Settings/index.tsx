import React, { useEffect, useContext } from "react"

import { StoreContext } from "../../store/store"
import "./Settings.scss"

interface SettingsItem {
	label: string
	info: string
	input: { type: string; options?: string[]; value: string | number }
	handler: (
		event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
	) => void
}

const Settings: React.FC = () => {
	const { state, actions } = useContext(StoreContext)
	const { settings } = state

	useEffect(() => {
		actions.getSettings()
	}, [])

	const handleOnChange = (
		event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
	) => {
		switch (event.target.name) {
			case "Max history":
				actions.updateMaxHistory(event.target.value)
				break
			case "Theme":
				actions.updateTheme(event.target.value)
				break
		}
	}

	const settingsItems: SettingsItem[] = [
		{
			label: "Max history",
			info: "The maximum number of history items that can be saved",
			input: { type: "text", value: settings.maxHistory },
			handler: handleOnChange,
		},
		{
			label: "Theme",
			info: "Select which theme you prefer to use, the Night or White theme.",
			input: { type: "select", options: ["Night", "White"], value: settings.theme },
			handler: handleOnChange,
		},
	]

	return (
		<div className="container">
			<header className="heading">
				<main>
					<h1 className="heading__heading">Settings & Preferences</h1>
					<p className="heading__subheading">Set your settings and preferences here</p>
				</main>
				<button className="btn" onClick={actions.resetSettings}>
					Reset settings
				</button>
			</header>
			<main className="settings">
				{settingsItems.map((item) => (
					<SettingsItem key={item.label} {...item} />
				))}
			</main>
		</div>
	)
}

const SettingsItem: React.FC<SettingsItem> = ({ label, input, info, handler }: SettingsItem) => {
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

export default Settings

import React, { useEffect, useContext } from "react"

import { StoreContext } from "../../store/store"
import "./Settings.scss"

interface SettingsElement {
	label: string
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
		console.log(event.target.name)

		switch (event.target.name) {
			case "Max history":
				actions.updateMaxHistory(event.target.value)
				break
			case "Theme":
				actions.updateTheme(event.target.value)
				break
		}
	}

	const settingsItems: SettingsElement[] = [
		{
			label: "Max history",
			input: { type: "text", value: settings.maxHistory },
			handler: handleOnChange,
		},
		{
			label: "Theme",
			input: { type: "select", options: ["Night", "White"], value: settings.theme },
			handler: handleOnChange,
		},
	]

	return (
		<div className="">
			<header className="heading container">
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

const SettingsItem: React.FC<SettingsElement> = ({ label, input, handler }: SettingsElement) => {
	if (input.type === "select")
		return (
			<div className="settings__item container">
				<label className="settings__label" htmlFor={label}>
					{label}:
				</label>
				<select value={input.value} onChange={handler} name={label}>
					{input.options?.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>
		)

	return (
		<div className="settings__item container">
			<label className="settings__label" htmlFor={label}>
				{label}:
			</label>
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

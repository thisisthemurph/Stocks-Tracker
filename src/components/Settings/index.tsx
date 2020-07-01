import React, { useEffect, useContext } from "react"

import { StoreContext } from "../../store/store"
import "./Settings.scss"

interface SettingsElement {
	label: string
	input: { type: string; value: string | number }
	handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Settings: React.FC = () => {
	const { state, actions } = useContext(StoreContext)
	const { settings } = state

	useEffect(() => {
		actions.getSettings()
	}, [])

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		actions.updateMaxHistory(e.target.value)
	}

	const settingsItems: SettingsElement[] = [
		{
			label: "Max history",
			input: { type: "text", value: settings.maxHistory },
			handler: handleOnChange,
		},
		{
			label: "Theme",
			input: { type: "text", value: settings.theme },
			handler: () => console.log("Theme not implemented"),
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
	return (
		<div className="settings__item container">
			<label className="settings__label" htmlFor={label}>
				{label}:
			</label>
			<input
				id={label}
				className="settings__input"
				type={input.type}
				value={input.value}
				onChange={handler}
			/>
		</div>
	)
}

export default Settings

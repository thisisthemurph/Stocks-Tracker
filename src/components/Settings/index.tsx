import React, { useEffect, useContext } from "react"

import SettingsItem from "./SettingsItem"
import { SettingsInput } from "./types"
import { StoreContext } from "../../store/store"
import "./Settings.scss"

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

	const settingsItems: SettingsInput[] = [
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

export default Settings

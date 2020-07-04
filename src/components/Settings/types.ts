export interface SettingsInput {
	label: string
	info: string
	input: { type: string; options?: string[]; value: string | number }
	handler: (
		event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
	) => void
}

import React from "react"

interface NavLinkProps {
	text: string
	children: JSX.Element
	logo?: boolean
}

const NavLink = ({ text, children, logo = false }: NavLinkProps) => {
	return (
		<a href="/" className="nav__link">
			{!logo ? children : null}
			<span className="nav__link-text">{text}</span>
			{logo ? children : null}
		</a>
	)
}

export default NavLink

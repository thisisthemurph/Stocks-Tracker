import React from "react"
import { Link } from "react-router-dom"

interface NavLinkProps {
	to: string
	text: string
	children: JSX.Element
	isLogo?: boolean
}

const NavLink = ({ to, text, children, isLogo = false }: NavLinkProps) => {
	return (
		<Link to={to} className="nav__link">
			{!isLogo ? children : null}
			<span className="nav__link-text">{text}</span>
			{isLogo ? children : null}
		</Link>
	)
}

export default NavLink

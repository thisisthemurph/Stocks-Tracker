import React, { MouseEvent } from "react"
import { Link } from "react-router-dom"

interface NavLinkProps {
	to: string
	text: string
	children: JSX.Element
	isLogo?: boolean
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const NavLink = ({ to, text, children, isLogo = false, onClick }: NavLinkProps) => {
	return (
		<Link to={to} className="nav__link" onClick={onClick}>
			{!isLogo ? children : null}
			<span className="nav__link-text">{text}</span>
			{isLogo ? children : null}
		</Link>
	)
}

export default NavLink

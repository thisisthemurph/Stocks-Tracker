import React from "react"
import { ReactComponent as Logo } from "./logo.svg"
import { HISTORY_ICON, STAR_ICON, SUN_ICON, MOON_ICON, SETTINGS_ICON } from "../../icons"
import "./Nav.scss"

const Nav: React.FC = () => {
	return (
		<nav className="nav">
			<ul className="nav__section">
				<li className="nav__item logo">
					<NavLink logo text="Filtersquid">
						<Logo />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink text="History">
						<HISTORY_ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink text="Favourites">
						<STAR_ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink text="Settings">
						<SETTINGS_ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink text="Theme">
						<MOON_ICON />
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

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

export default Nav

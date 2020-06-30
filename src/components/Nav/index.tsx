import React from "react"

import NavLink from "./NavLink"
import { ReactComponent as Logo } from "./logo.svg"
import { HISTORY_ICON, BOOKMARK__ICON, SUN_ICON, MOON_ICON, SETTINGS_ICON } from "../../icons"
import "./Nav.scss"

const Nav: React.FC = () => {
	return (
		<nav className="nav">
			<ul className="nav__section">
				<li className="nav__item logo">
					<NavLink to="/" isLogo text="Filtersquid">
						<Logo />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink to="/history" text="History">
						<HISTORY_ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink to="/favourites" text="Favourites">
						<BOOKMARK__ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink to="/" text="Settings">
						<SETTINGS_ICON />
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink to="/" text="Theme">
						<MOON_ICON />
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Nav

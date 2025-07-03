"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import styles from "./menu.module.css"

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const router = useRouter()

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleMenuClick = (action) => {
		setIsOpen(false)
		// Handle different menu actions using proper Next.js navigation
		switch (action) {
			case 'country-list':
				router.push('/menu/country-list')
				break
			case 'request-changes':
				router.push('/menu/request-changes')
				break
			case 'about':
				router.push('/menu/about')
				break
			default:
				break
		}
	}

	// Handle click outside to close menu
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	return (
		<div className={styles.menuContainer} ref={menuRef}>
			<button 
				className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
				onClick={toggleMenu}
				aria-label="Toggle menu"
			>
				<span className={styles.hamburgerLine}></span>
				<span className={styles.hamburgerLine}></span>
				<span className={styles.hamburgerLine}></span>
			</button>
			
			<div className={`${styles.menuDropdown} ${isOpen ? styles.menuDropdownOpen : ''}`}>
				<button 
					className={styles.menuItem}
					onClick={() => handleMenuClick('country-list')}
				>
					<svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2 12h20"/>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
					Country List
				</button>
				<button 
					className={styles.menuItem}
					onClick={() => handleMenuClick('request-changes')}
				>
					<svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M12 20h9"/>
						<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
					</svg>
					Request Changes
				</button>
				<button 
					className={styles.menuItem}
					onClick={() => handleMenuClick('about')}
				>
					<svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="12" cy="12" r="10"/>
						<line x1="12" y1="16" x2="12" y2="10"/>
						<line x1="12" y1="8" x2="12" y2="8"/>
					</svg>
					About
				</button>
			</div>
		</div>
	)
} 
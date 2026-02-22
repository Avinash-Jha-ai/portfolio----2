import { useEffect, useRef, useState } from 'react'

const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (e, href) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
            <a href="#" className="navbar__logo" onClick={(e) => handleNav(e, '#')}>Avinash Jha</a>
            <ul className="navbar__links">
                {links.map((l) => (
                    <li key={l.label}>
                        <a
                            href={l.href}
                            className="navbar__link"
                            onClick={(e) => handleNav(e, l.href)}
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

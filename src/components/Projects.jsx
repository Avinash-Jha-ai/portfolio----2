import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'

const GITHUB_BASE = 'https://github.com/Avinash-Jha-ai'

const projects = [
    {
        num: '01',
        title: 'Insta Clone',
        desc: 'A full-featured Instagram clone with user authentication, post feed, image uploads, likes and comments. Built with a modern React frontend and Node.js backend.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        gradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
        emoji: '📸',
        github: `${GITHUB_BASE}/insta-clone`,
        live: `${GITHUB_BASE}/insta-clone`,
    },
    {
        num: '02',
        title: 'Real-Time Chat App',
        desc: 'A two-way real-time chat application with Socket.io for bidirectional communication, message history, and user rooms. Fully functional messaging system.',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        gradient: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
        emoji: '💬',
        github: `${GITHUB_BASE}/chat`,
        live: `${GITHUB_BASE}/chat`,
    },
    {
        num: '03',
        title: 'Authentication System',
        desc: 'A robust full-stack authentication system featuring JWT tokens, Google OAuth, protected routes, and session management. Production-ready security patterns.',
        tags: ['React', 'Express', 'MongoDB', 'JWT'],
        gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)',
        emoji: '🔐',
        github: `${GITHUB_BASE}/authentication`,
        live: `${GITHUB_BASE}/authentication`,
    },
    {
        num: '04',
        title: 'Portfolio Website',
        desc: 'An immersive personal portfolio with Three.js particle systems, GSAP scroll animations, a custom cursor, ambient music player, and frame-by-frame transitions.',
        tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
        gradient: 'linear-gradient(135deg, #2563eb, #06b6d4)',
        emoji: '🌌',
        github: `${GITHUB_BASE}/portfolio`,
        live: 'https://avinash-jha-ai.github.io/portfolio',
    },
]

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                scrollTrigger: { trigger: '.projects__grid', start: 'top 80%' },
                y: 80, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out'
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const handleTilt = (e, card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(card, {
            rotateX: -y / 20,
            rotateY: x / 20,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out'
        })
    }

    const handleTiltLeave = (card) => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
    }

    return (
        <section className="projects" id="projects" ref={sectionRef}>
            <div className="projects__header">
                <div>
                    <p className="section-label">Portfolio</p>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                </div>
                <a
                    href={GITHUB_BASE}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}
                >
                    View All on GitHub ↗
                </a>
            </div>

            <div className="projects__grid">
                {projects.map((p) => (
                    <div
                        key={p.num}
                        className="project-card glass-card"
                        onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                        onMouseLeave={(e) => handleTiltLeave(e.currentTarget)}
                    >
                        <div className="project-card__image">
                            <div
                                className="project-card__image-bg"
                                style={{ background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}
                            >
                                {p.emoji}
                            </div>
                            <div className="project-card__overlay" />
                        </div>
                        <div className="project-card__body">
                            <div className="project-card__number">{p.num}</div>
                            <h3 className="project-card__title">{p.title}</h3>
                            <p className="project-card__desc">{p.desc}</p>
                            <div className="project-card__tags">
                                {p.tags.map((t) => (
                                    <span key={t} className="project-card__tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-card__links">
                                <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                                    <Github size={14} /> GitHub
                                </a>
                                <a href={p.live} target="_blank" rel="noreferrer" className="project-link">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

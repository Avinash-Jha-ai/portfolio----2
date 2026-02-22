import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const categories = [
    {
        title: '✦ Languages',
        skills: [
            { name: 'C / C++', pct: 88 },
            { name: 'Python', pct: 82 },
            { name: 'JavaScript', pct: 90 },
            { name: 'HTML / CSS', pct: 95 },
        ]
    },
    {
        title: '✦ Frontend',
        skills: [
            { name: 'React.js', pct: 92 },
            { name: 'GSAP', pct: 85 },
            { name: 'Framer Motion', pct: 80 },
            { name: 'Three.js', pct: 75 },
        ]
    },
    {
        title: '✦ Backend & DB',
        skills: [
            { name: 'Node.js', pct: 88 },
            { name: 'Express.js', pct: 87 },
            { name: 'MongoDB', pct: 85 },
            { name: 'REST APIs', pct: 90 },
        ]
    }
]

export default function Skills() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.skills__category', {
                scrollTrigger: { trigger: '.skills__grid', start: 'top 80%' },
                y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
            })

            document.querySelectorAll('.skill-bar__fill').forEach((bar) => {
                const target = bar.dataset.pct
                ScrollTrigger.create({
                    trigger: bar,
                    start: 'top 90%',
                    onEnter: () => {
                        gsap.to(bar, { width: target + '%', duration: 1.6, ease: 'power3.out' })
                    }
                })
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="skills" id="skills" ref={sectionRef}>
            <div className="skills__inner">
                <div className="skills__header">
                    <p className="section-label" style={{ justifyContent: 'center' }}>Expertise</p>
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span> &amp; Stack
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                        From systems programming in C++ to building full-stack web apps — here's what I work with every day.
                    </p>
                </div>

                <div className="skills__grid">
                    {categories.map((cat) => (
                        <div key={cat.title} className="skills__category glass-card">
                            <h3 className="skills__cat-title">{cat.title}</h3>
                            {cat.skills.map((sk) => (
                                <div key={sk.name} className="skill-item">
                                    <div className="skill-item__header">
                                        <span className="skill-item__name">{sk.name}</span>
                                        <span className="skill-item__pct">{sk.pct}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-bar__fill" data-pct={sk.pct} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

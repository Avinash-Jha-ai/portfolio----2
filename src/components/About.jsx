import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about__image-frame', {
                scrollTrigger: { trigger: '.about__grid', start: 'top 80%' },
                x: -80, opacity: 0, duration: 1.2, ease: 'power3.out'
            })
            gsap.from('.about__text', {
                scrollTrigger: { trigger: '.about__grid', start: 'top 75%' },
                y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
            })
            gsap.from('.about__stat', {
                scrollTrigger: { trigger: '.about__stats', start: 'top 85%' },
                scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)'
            })
            gsap.from('.about__tag', {
                scrollTrigger: { trigger: '.about__tags', start: 'top 90%' },
                y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out'
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const tags = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'Three.js', 'GSAP', 'Docker', 'Python', 'Git']

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="about__grid">
                <div className="about__image-wrap">
                    <div className="about__image-frame glass-card">
                        <div className="about__image-bg">
                            <span style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.5))' }}>👨‍💻</span>
                        </div>
                    </div>
                    <div className="about__image-glow" />
                    <div className="about__stats">
                        {[
                            { num: '3+', label: 'Years Experience' },
                            { num: '20+', label: 'Projects Built' },
                            { num: '10+', label: 'Technologies' },
                            { num: '5★', label: 'Client Rating' },
                        ].map((s) => (
                            <div key={s.label} className="about__stat glass-card">
                                <div className="about__stat-num">{s.num}</div>
                                <div className="about__stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="section-label">About Me</p>
                    <h2 className="section-title">
                        Building digital experiences that <span className="gradient-text">matter</span>
                    </h2>
                    <p className="about__text">
                        Hey! I'm Avinash Jha, a passionate Full Stack Developer and Creative Technologist based in India. I specialize in crafting immersive web experiences that blend cutting-edge technology with elegant design.
                    </p>
                    <p className="about__text">
                        My journey started with a curiosity for how things work on the internet, and it's grown into a deep love for building scalable applications. From pixel-perfect frontends to robust backends, I bring ideas to life through code.
                    </p>
                    <p className="about__text">
                        When I'm not coding, I'm exploring new technologies, contributing to open source projects, or finding inspiration in music and design.
                    </p>
                    <div className="about__tags">
                        {tags.map((t) => (
                            <span key={t} className="about__tag">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

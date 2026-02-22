import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
    {
        period: '2024 — Present',
        title: 'Full Stack Developer',
        company: 'Freelance / Open Source',
        desc: 'Building custom web applications and contributing to open source projects. Specializing in React frontends with Node.js backends. Delivered 10+ projects.',
    },
    {
        period: '2023 — 2024',
        title: 'Frontend Developer',
        company: 'Tech Startup (Remote)',
        desc: 'Developed responsive React dashboards, implemented GSAP animation systems, and improved page load speed by 45% through code splitting and lazy loading.',
    },
    {
        period: '2022 — 2023',
        title: 'Web Developer Intern',
        company: 'Digital Agency',
        desc: 'Assisted in building client websites using React and WordPress. Learned about project management, Agile workflows, and client communication best practices.',
    },
    {
        period: '2021 — 2022',
        title: 'CS Student & Self-Learner',
        company: 'University + Online Courses',
        desc: 'Started my coding journey with Python and JavaScript. Completed multiple bootcamps, built side projects, and fell in love with creative coding and web animations.',
    },
]

export default function Experience() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            items.forEach((_, i) => {
                const isOdd = i % 2 === 0
                gsap.from(`.timeline-item-${i}`, {
                    scrollTrigger: {
                        trigger: `.timeline-item-${i}`,
                        start: 'top 85%',
                    },
                    x: isOdd ? -60 : 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out'
                })
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="experience" id="experience" ref={sectionRef}>
            <div className="experience__inner">
                <div className="experience__header">
                    <p className="section-label" style={{ justifyContent: 'center' }}>Journey</p>
                    <h2 className="section-title">
                        My <span className="gradient-text">Experience</span>
                    </h2>
                </div>

                <div className="timeline">
                    {items.map((item, i) => (
                        <div key={i} className={`timeline-item timeline-item-${i}`}>
                            {i % 2 === 0 ? (
                                <>
                                    <div className={`timeline-item__card glass-card`}>
                                        <div className="timeline-item__period">{item.period}</div>
                                        <h3 className="timeline-item__title">{item.title}</h3>
                                        <div className="timeline-item__company">{item.company}</div>
                                        <p className="timeline-item__desc">{item.desc}</p>
                                    </div>
                                    <div className="timeline-item__dot" />
                                    <div className="timeline-item__empty" />
                                </>
                            ) : (
                                <>
                                    <div className="timeline-item__empty" />
                                    <div className="timeline-item__dot" />
                                    <div className={`timeline-item__card glass-card`}>
                                        <div className="timeline-item__period">{item.period}</div>
                                        <h3 className="timeline-item__title">{item.title}</h3>
                                        <div className="timeline-item__company">{item.company}</div>
                                        <p className="timeline-item__desc">{item.desc}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

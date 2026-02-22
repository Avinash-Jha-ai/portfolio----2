import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react'

export default function Contact() {
    const sectionRef = useRef(null)
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact__big-text', {
                scrollTrigger: { trigger: '.contact__header', start: 'top 80%' },
                y: 60, opacity: 0, duration: 1, ease: 'power3.out'
            })
            gsap.from('.contact__form', {
                scrollTrigger: { trigger: '.contact__form', start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
            })
            gsap.from('.social-link', {
                scrollTrigger: { trigger: '.contact__socials', start: 'top 90%' },
                y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Fake submission animation
        gsap.to('.btn-send', {
            scale: 0.95, duration: 0.1, yoyo: true, repeat: 1,
            onComplete: () => setSent(true)
        })
    }

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <div className="contact__header">
                <p className="section-label" style={{ justifyContent: 'center' }}>Let's Talk</p>
                <h2 className="contact__big-text">
                    Say <span className="gradient-text">Hello!</span> 👋
                </h2>
                <p className="contact__sub">
                    Have a project in mind or just want to chat? My inbox is always open. I'll get back to you as soon as possible!
                </p>
                <a href="mailto:avinashjha@example.com" className="btn-primary" style={{ display: 'inline-block', marginBottom: '2rem' }}>
                    <span>📧 avinashjha@example.com</span>
                </a>
            </div>

            <form className="contact__form glass-card" style={{ padding: '2rem', textAlign: 'left' }} onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary btn-send" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        {sent ? '✅ Message Sent!' : <><Send size={16} /> Send Message</>}
                    </span>
                </button>
            </form>

            <div className="contact__socials" style={{ marginTop: '3rem' }}>
                {[
                    { icon: <Github size={16} />, label: 'GitHub', href: 'https://github.com' },
                    { icon: <Linkedin size={16} />, label: 'LinkedIn', href: 'https://linkedin.com' },
                    { icon: <Twitter size={16} />, label: 'Twitter', href: 'https://twitter.com' },
                    { icon: <Mail size={16} />, label: 'Email', href: 'mailto:avinashjha@example.com' },
                ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                        {s.icon} {s.label}
                    </a>
                ))}
            </div>
        </section>
    )
}

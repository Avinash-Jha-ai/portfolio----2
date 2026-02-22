import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { TypeAnimation } from 'react-type-animation'
import FloatingCreatures from './FloatingCreatures'

function StarField() {
    const ref = useRef()
    const sphere = random.inSphere(new Float32Array(5000), { radius: 2 })

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 25
            ref.current.rotation.y -= delta / 30
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#7c3aed"
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export default function Hero() {
    const greetingRef = useRef(null)
    const nameRef = useRef(null)
    const ctasRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 2.8 })

        tl.to(greetingRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
        })

        // Animate each character
        const chars = nameRef.current?.querySelectorAll('.hero__name-char') || []
        tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.06,
            stagger: 0.04,
            ease: 'power3.out'
        }, '-=0.3')

        tl.to(ctasRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
        }, '-=0.2')

        tl.to(scrollRef.current, {
            opacity: 1, duration: 0.8, ease: 'power3.out'
        }, '-=0.3')
    }, [])

    const name = 'Avinash Jha'

    return (
        <section className="hero" id="home">
            <div className="hero__canvas">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>
            <div className="hero__gradient" />
            <div className="hero__grid" />

            <div className="hero__content">
                <p className="hero__greeting" ref={greetingRef}>
                    ✦ Welcome to my universe
                </p>

                <h1 className="hero__name" ref={nameRef}>
                    {name.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`hero__name-char gradient-text`}
                            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>

                <div className="hero__subtitle">
                    <TypeAnimation
                        sequence={[
                            'Full Stack Developer',
                            2000,
                            'Creative Technologist',
                            2000,
                            'UI/UX Enthusiast',
                            2000,
                            'Problem Solver',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </div>

                <div className="hero__ctas" ref={ctasRef}>
                    <a href="#projects" className="btn-primary"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }) }}>
                        <span>View My Work</span>
                    </a>
                    <a href="#contact" className="btn-outline"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}>
                        Get In Touch
                    </a>
                </div>
            </div>

            <div className="hero__scroll" ref={scrollRef}>
                <div className="hero__scroll-line" />
                <div className="hero__scroll-text">scroll</div>
            </div>
        </section>
    )
}

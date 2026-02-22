import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import FloatingCreatures from './FloatingCreatures'

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null)
    const barRef = useRef(null)
    const countRef = useRef(null)
    const enterRef = useRef(null)
    const contentRef = useRef(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const tl = gsap.timeline()

        // Count up 0 → 100
        let count = { val: 0 }
        tl.to(count, {
            val: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (countRef.current) countRef.current.textContent = Math.round(count.val) + '%'
                if (barRef.current) barRef.current.style.width = count.val + '%'
            },
        })

        // Pause, then show the "Click to Enter" prompt
        tl.to({}, { duration: 0.3 })
        tl.call(() => setReady(true))

        return () => tl.kill()
    }, [onComplete])

    // Animate in the enter prompt once ready
    useEffect(() => {
        if (ready && enterRef.current) {
            gsap.fromTo(enterRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            )
        }
    }, [ready])

    const handleEnter = () => {
        // Dispatch event so MusicPlayer can start playing (user gesture = music allowed)
        window.dispatchEvent(new Event('portfolioEnter'))

        gsap.to(preloaderRef.current, {
            clipPath: 'inset(100% 0 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: () => {
                if (onComplete) onComplete()
            },
        })
    }

    useEffect(() => {
        if (!ready) return

        const onKeyDown = (e) => {
            handleEnter()
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [ready])

    return (
        <div className="preloader" ref={preloaderRef} style={{ cursor: ready ? 'none' : 'default' }} onClick={ready ? handleEnter : undefined}>
            <FloatingCreatures count={100} zIndex={0} excludeRef={contentRef} />
            <div className="preloader__content" ref={contentRef}>
                <div className="preloader__logo">Avinash Jha</div>
                <div className="preloader__bar-wrap">
                    <div className="preloader__bar" ref={barRef} />
                </div>
                <div className="preloader__count" ref={countRef}>0%</div>

                {ready && (
                    <div ref={enterRef} style={{ marginTop: '2.5rem', opacity: 0 }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.2em',
                            color: 'var(--accent-cyan)',
                            textTransform: 'uppercase',
                            animation: 'pulse 1.8s ease-in-out infinite',
                        }}>
                            ✦ Click anywhere or press any key to enter ✦
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
        </div>
    )
}

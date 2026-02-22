import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const mainRef = useRef(null)
    const trailRef = useRef(null)
    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    useEffect(() => {
        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (mainRef.current) {
                mainRef.current.style.left = mouseX + 'px'
                mainRef.current.style.top = mouseY + 'px'
            }
        }

        let rafId
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.12
            trailY += (mouseY - trailY) * 0.12
            if (trailRef.current) {
                trailRef.current.style.left = trailX + 'px'
                trailRef.current.style.top = trailY + 'px'
            }
            rafId = requestAnimationFrame(animateTrail)
        }
        animateTrail()

        const onEnter = () => document.body.classList.add('hovering')
        const onLeave = () => document.body.classList.remove('hovering')

        const interactiveEls = document.querySelectorAll('a, button, [data-cursor]')
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })

        // Also attach to dynamically-added interactive elements via delegation
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', (e) => {
            const el = e.target.closest('a, button, [data-cursor]')
            if (el) onEnter()
            else onLeave()
        })

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            <div className="cursor-main" ref={mainRef} />
            <div className="cursor-trail" ref={trailRef} />
        </>
    )
}

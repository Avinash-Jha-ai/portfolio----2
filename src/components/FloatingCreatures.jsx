import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CREATURES = ['🐱', '🦊', '🐸', '🐼', '🐧', '🐰', '🦋', '🐙', '🦄', '🐳', '🦖', '🐝','🐿️','🐦‍🔥','🐉']

// Pick a random position outside the excluded bounding rect (+ padding)
function getValidPosition(excludeRect, padding = 60) {
    const maxAttempts = 30
    for (let i = 0; i < maxAttempts; i++) {
        const x = Math.random() * (window.innerWidth - 60)
        const y = Math.random() * (window.innerHeight - 60)
        if (
            !excludeRect ||
            x + 30 < excludeRect.left - padding ||
            x > excludeRect.right + padding ||
            y + 30 < excludeRect.top - padding ||
            y > excludeRect.bottom + padding
        ) {
            return { x, y }
        }
    }
    // Fallback: edges of the screen
    const x =
        Math.random() < 0.5
            ? Math.random() * ((excludeRect ? excludeRect.left - padding : window.innerWidth * 0.3) - 60)
            : (excludeRect ? excludeRect.right + padding : window.innerWidth * 0.7) + Math.random() * 120
    return { x: Math.max(0, x), y: Math.random() * window.innerHeight }
}

export default function FloatingCreatures({ count = 10, zIndex = 2, excludeRef }) {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const items = Array.from(container.querySelectorAll('.creature'))

        // Track mouse position
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        const onMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        window.addEventListener('mousemove', onMouseMove)

        // ~0% of creatures will be "attracted" to the cursor
        const attractedCount = 0

        items.forEach((el, idx) => {
            const isAttracted = idx < attractedCount

            const getExcludeRect = () =>
                excludeRef?.current ? excludeRef.current.getBoundingClientRect() : null

            // Random valid starting position
            const { x: startX, y: startY } = getValidPosition(getExcludeRect())

            gsap.set(el, { x: startX, y: startY, scale: 0, opacity: 0 })

            gsap.to(el, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                delay: Math.random() * 2,
                ease: 'back.out(2)',
            })

            if (isAttracted) {
                // Cursor-attracted creatures: use gsap ticker to softly follow mouse
                // with some random offset so they cluster loosely, not on top of each other
                const offsetX = (Math.random() - 0.5) * 120
                const offsetY = (Math.random() - 0.5) * 120
                const speed = 0.04 + Math.random() * 0.06  // lerp speed (laziness)

                let currentX = startX
                let currentY = startY

                const tick = () => {
                    const targetX = mouse.x + offsetX
                    const targetY = mouse.y + offsetY
                    currentX += (targetX - currentX) * speed
                    currentY += (targetY - currentY) * speed
                    gsap.set(el, { x: currentX, y: currentY })
                }

                gsap.ticker.add(tick)
                // Store ticker ref on element for cleanup
                el._tick = tick

                // Subtle scale breathe
                gsap.to(el, {
                    scale: 1.3,
                    duration: 0.8 + Math.random() * 0.6,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                })
            } else {
                // Normal wandering creatures — stay outside content area
                const wander = () => {
                    const { x: newX, y: newY } = getValidPosition(getExcludeRect())
                    const dur = 3 + Math.random() * 5

                    gsap.to(el, {
                        x: newX,
                        y: newY,
                        duration: dur,
                        ease: 'sine.inOut',
                        onComplete: wander,
                    })

                    gsap.to(el, {
                        rotation: (Math.random() - 0.5) * 30,
                        duration: dur / 2,
                        yoyo: true,
                        repeat: 1,
                        ease: 'sine.inOut',
                    })

                    gsap.to(el, {
                        scale: 0.8 + Math.random() * 0.5,
                        duration: dur / 3,
                        yoyo: true,
                        repeat: 2,
                        ease: 'sine.inOut',
                    })
                }

                gsap.delayedCall(Math.random() * 2 + 0.5, wander)
            }
        })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            items.forEach((el) => {
                if (el._tick) gsap.ticker.remove(el._tick)
            })
            gsap.killTweensOf(items)
        }
    }, [count, excludeRef])

    const selected = Array.from({ length: count }, (_, i) => CREATURES[i % CREATURES.length])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex,
            }}
        >
            {selected.map((emoji, i) => (
                <div
                    key={i}
                    className="creature"
                    style={{
                        position: 'absolute',
                        fontSize: `${1.0 + Math.random() * 0.9}rem`,
                        filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.4))',
                        willChange: 'transform',
                        userSelect: 'none',
                        lineHeight: 1,
                    }}
                >
                    {emoji}
                </div>
            ))}
        </div>
    )
}

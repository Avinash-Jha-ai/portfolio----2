import { useRef, useState, useEffect } from 'react'
import { Music } from 'lucide-react'
import { gsap } from 'gsap'

// YouTube video ID from https://youtu.be/KURhXtIaaRI
const YT_VIDEO_ID = 'Z33ppdX37Ng'

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false)
    const playerRef = useRef(null)
    const playerReadyRef = useRef(false)
    const pendingPlayRef = useRef(false)
    const btnRef = useRef(null)
    const iframeContainerRef = useRef(null)

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            document.head.appendChild(tag)
        }

        // Called by YouTube API when ready
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(iframeContainerRef.current, {
                videoId: YT_VIDEO_ID,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    loop: 1,
                    playlist: YT_VIDEO_ID,
                    mute: 0,
                },
                events: {
                    onReady: () => {
                        playerReadyRef.current = true
                        playerRef.current.setVolume(50)
                        // If portfolioEnter fired before player was ready, play now
                        if (pendingPlayRef.current) {
                            playerRef.current.playVideo()
                            pendingPlayRef.current = false
                        }
                    },
                    onStateChange: (e) => {
                        setPlaying(e.data === window.YT.PlayerState.PLAYING)
                    },
                },
            })
        }

        // If YT API already loaded (e.g. hot reload), init player manually
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady()
        }

        // Listen for the preloader "Click to Enter" event
        const onEnter = () => {
            if (playerReadyRef.current) {
                playerRef.current?.playVideo()
            } else {
                // Player not ready yet — flag it
                pendingPlayRef.current = true
            }
        }
        window.addEventListener('portfolioEnter', onEnter)

        return () => {
            window.removeEventListener('portfolioEnter', onEnter)
            playerRef.current?.destroy()
        }
    }, [])

    const toggle = () => {
        if (!playerReadyRef.current) return
        gsap.fromTo(btnRef.current,
            { scale: 0.85 },
            { scale: 1, duration: 0.4, ease: 'back.out(2)' }
        )
        if (playing) {
            playerRef.current.pauseVideo()
        } else {
            playerRef.current.playVideo()
        }
    }

    return (
        <>
            {/* Hidden YouTube iframe */}
            <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <div ref={iframeContainerRef} />
            </div>

            {/* Music toggle button */}
            <div style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <button
                    ref={btnRef}
                    className={`music-btn ${playing ? 'playing' : ''}`}
                    onClick={toggle}
                    title={playing ? 'Pause Music' : 'Play Music'}
                    aria-label="Toggle music"
                >
                    {playing ? (
                        <div className="equalizer">
                            <div className="eq-bar" />
                            <div className="eq-bar" />
                            <div className="eq-bar" />
                            <div className="eq-bar" />
                        </div>
                    ) : (
                        <Music size={20} />
                    )}
                </button>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                    {playing ? 'PLAYING' : 'MUSIC'}
                </span>
            </div>
        </>
    )
}

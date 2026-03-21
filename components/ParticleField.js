import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    /*
      Accessibility Fix: skip animation entirely for users who prefer reduced motion.
      This respects WCAG 2.1 criterion 2.3.3 for vestibular disorders.
    */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth
    let H = window.innerHeight

    /* Responsive Fix: fewer particles on mobile to save battery and GPU */
    const isMobile = W < 640
    const PARTICLE_COUNT = isMobile ? 40 : 80

    canvas.width = W
    canvas.height = H

    const makeStars = (count, w, h) =>
      Array.from({ length: count }, () => ({
        x:     Math.random() * w,
        y:     Math.random() * h,
        r:     Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
        drift: (Math.random() - 0.5) * 0.05,
      }))

    let stars = makeStars(PARTICLE_COUNT, W, H)

    function draw() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach((s) => {
        s.y     -= s.speed
        s.x     += s.drift
        s.alpha += (Math.random() - 0.5) * 0.008
        s.alpha  = Math.max(0.05, Math.min(0.6, s.alpha))

        if (s.y < -2)  { s.y = H + 2; s.x = Math.random() * W }
        if (s.x < 0)   { s.x = W }
        if (s.x > W)   { s.x = 0 }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 169, 0, ${s.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    /*
      Performance Fix: debounced resize handler prevents rapid canvas resets
      and flickering. Stars are redistributed to the new viewport on resize.
    */
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        W = window.innerWidth
        H = window.innerHeight
        canvas.width  = W
        canvas.height = H
        /* Redistribute stars so they don't cluster at old positions */
        stars = makeStars(PARTICLE_COUNT, W, H)
      }, 150)
    }

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"           /* Accessibility Fix: purely decorative, hide from screen readers */
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

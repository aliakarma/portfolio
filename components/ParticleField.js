import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.15 + 0.02,
      drift: (Math.random() - 0.5) * 0.05,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach((s) => {
        s.y -= s.speed
        s.x += s.drift
        s.alpha += (Math.random() - 0.5) * 0.008
        s.alpha = Math.max(0.05, Math.min(0.6, s.alpha))
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W }
        if (s.x < 0) s.x = W
        if (s.x > W) s.x = 0

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 169, 0, ${s.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

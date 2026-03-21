import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { researchNodes, researchEdges, groupColors } from '../data/researchThemes'

export default function ResearchGraph() {
  const svgRef    = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [loaded,  setLoaded]  = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    /* Detect touch device for UI label */
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    let sim, cleanup

    const init = async () => {
      let d3
      try {
        d3 = await import('d3')
      } catch {
        setLoaded(true)
        return
      }

      const svg = d3.select(svgRef.current)
      const W   = svgRef.current.clientWidth || 700
      /* Responsive Fix: shorter height on narrow screens */
      const H   = W < 480 ? 300 : 420
      svg.attr('width', W).attr('height', H)
      svg.selectAll('*').remove()

      /* Glow filter */
      const defs  = svg.append('defs')
      const glow  = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      glow.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur')
      const feMerge = glow.append('feMerge')
      feMerge.append('feMergeNode').attr('in', 'coloredBlur')
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

      const nodes = researchNodes.map(n => ({ ...n }))
      const edges = researchEdges.map(e => ({ ...e }))

      sim = d3.forceSimulation(nodes)
        .force('link',      d3.forceLink(edges).id(d => d.id).distance(d => 90 + (3 - d.weight) * 20))
        .force('charge',    d3.forceManyBody().strength(-260))
        .force('center',    d3.forceCenter(W / 2, H / 2))
        .force('collision', d3.forceCollide().radius(d => d.size + 18))

      /* Edges */
      const link = svg.append('g').selectAll('line')
        .data(edges)
        .join('line')
        .attr('stroke', 'rgba(232,169,0,0.12)')
        .attr('stroke-width', d => d.weight * 0.8)

      /*
        Responsive Fix: helper to clamp tooltip position within the visible viewport
        so it doesn't render partially off-screen near right/bottom edges.
      */
      const clampTooltip = (pageX, pageY) => ({
        x: Math.min(pageX, (window.innerWidth  || document.documentElement.clientWidth)  - 260),
        y: Math.max(pageY - 10, 10),
      })

      const node = svg.append('g').selectAll('g')
        .data(nodes)
        .join('g')
        .attr('cursor', 'pointer')
        .attr('role', 'img')
        .attr('aria-label', d => `${d.label}: ${d.description}`)
        .call(
          d3.drag()
            .on('start', (event, d) => {
              if (!event.active) sim.alphaTarget(0.3).restart()
              d.fx = d.x; d.fy = d.y
            })
            .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y })
            .on('end',  (event, d) => {
              if (!event.active) sim.alphaTarget(0)
              d.fx = null; d.fy = null
            })
        )
        /* Mouse events (desktop) */
        .on('mouseenter', (event, d) => {
          setHovered(d.id)
          const { x, y } = clampTooltip(event.pageX, event.pageY)
          setTooltip({ node: d, x, y })
        })
        .on('mousemove', (event) => {
          const { x, y } = clampTooltip(event.pageX, event.pageY)
          setTooltip(prev => prev ? { ...prev, x, y } : prev)
        })
        .on('mouseleave', () => {
          setHovered(null)
          setTooltip(null)
        })
        /*
          Responsive Fix: touch events for mobile — mouseenter/leave don't fire
          reliably on touch devices. touchstart shows tooltip, touchend hides it.
        */
        .on('touchstart', (event, d) => {
          event.preventDefault()
          const touch = event.touches[0]
          setHovered(d.id)
          const { x, y } = clampTooltip(touch.pageX, touch.pageY)
          setTooltip({ node: d, x, y })
        }, { passive: false })
        .on('touchend', () => {
          setTimeout(() => { setHovered(null); setTooltip(null) }, 1200)
        })

      /* Outer ring */
      node.append('circle')
        .attr('r', d => d.size + 8)
        .attr('fill', 'none')
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.2)

      /* Main circle */
      node.append('circle')
        .attr('r', d => d.size)
        .attr('fill', d => groupColors[d.group] + '22')
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#glow)')

      /* Label */
      node.append('text')
        .text(d => d.label)
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.size + 16)
        .attr('font-family', "'JetBrains Mono', monospace")
        .attr('font-size', '9px')
        .attr('fill', 'rgba(237,229,208,0.65)')

      sim.on('tick', () => {
        link
          .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
        node.attr('transform', d => `translate(${d.x},${d.y})`)
      })

      cleanup = () => { sim.stop(); svg.selectAll('*').remove() }
      setLoaded(true)
    }

    init()
    return () => { if (cleanup) cleanup() }
  }, [])

  const hoveredNode = hovered ? researchNodes.find(n => n.id === hovered) : null

  return (
    <div className="relative w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center" aria-live="polite">
          <p className="font-mono text-xs text-parchment-400 animate-pulse">Initializing graph…</p>
        </div>
      )}

      <svg
        ref={svgRef}
        role="img"
        aria-label="Interactive research knowledge graph showing connections between research themes"
        className="w-full rounded-sm"
        style={{ minHeight: 280, opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 justify-center">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
            <span className="font-mono text-xs text-parchment-400/60 capitalize">{group}</span>
          </div>
        ))}
        {/* Responsive Fix: only show drag hint on non-touch devices */}
        {!isTouch && (
          <span className="font-mono text-xs text-parchment-400/40 ml-2">· drag to explore</span>
        )}
        {isTouch && (
          <span className="font-mono text-xs text-parchment-400/40 ml-2">· tap nodes to explore</span>
        )}
      </div>

      {/* Tooltip — clamped to viewport */}
      <AnimatePresence>
        {tooltip && hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none"
            style={{ left: tooltip.x + 12, top: tooltip.y }}
          >
            <div className="glass-card border border-gold-500/25 p-3 max-w-xs shadow-xl">
              <p className="font-display text-base text-parchment-100 mb-1">{hoveredNode.label}</p>
              <p className="font-body text-xs text-parchment-400 leading-relaxed mb-2">{hoveredNode.description}</p>
              <p className="font-mono text-xs text-gold-400/70">
                {hoveredNode.papers.length} related paper{hoveredNode.papers.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

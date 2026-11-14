import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { groupColors } from '../data/researchThemes'

/* Theme → filtered publication archive. */
const topicHref = (tag) => `/research/?tag=${encodeURIComponent(tag)}`
const nodeRadius = (count) => 8 + 3 * Math.sqrt(count)

/*
  `graph` comes from researchGraph() in lib/content.js, computed from the
  papers at build time. This component only draws it.
*/
export default function ResearchGraph({ graph }) {
  const svgRef    = useRef(null)
  const router    = useRouter()
  const routerRef = useRef(router)
  const [tooltip, setTooltip] = useState(null)
  const [loaded,  setLoaded]  = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => { routerRef.current = router }, [router])

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    let sim, cleanup

    const init = async () => {
      let d3
      try {
        const [force, selection, drag] = await Promise.all([
          import('d3-force'),
          import('d3-selection'),
          import('d3-drag'),
        ])
        d3 = { ...force, ...selection, ...drag }
      } catch (err) {
        console.error('D3 load error:', err)
        setLoaded(true)
        return
      }
      if (!svgRef.current) return

      const svg = d3.select(svgRef.current)
      const W   = svgRef.current.clientWidth || 700
      const H   = W < 480 ? 340 : 460
      svg.attr('width', W).attr('height', H)
      svg.selectAll('*').remove()

      const defs = svg.append('defs')
      const glow = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      glow.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur')
      const feMerge = glow.append('feMerge')
      feMerge.append('feMergeNode').attr('in', 'coloredBlur')
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

      const nodes = graph.nodes.map(n => ({ ...n, r: nodeRadius(n.count) }))
      const edges = graph.edges.map(e => ({ ...e }))
      const strength = (d) => Math.min(d.shared, 8)

      sim = d3.forceSimulation(nodes)
        .force('link',      d3.forceLink(edges).id(d => d.id).distance(d => 150 - strength(d) * 8))
        .force('charge',    d3.forceManyBody().strength(-300))
        .force('center',    d3.forceCenter(W / 2, H / 2))
        .force('collision', d3.forceCollide().radius(d => d.r + 20))
        // themes with no links would otherwise drift to the corners
        .force('x',         d3.forceX(W / 2).strength(0.05))
        .force('y',         d3.forceY(H / 2).strength(0.08))

      const link = svg.append('g').selectAll('line')
        .data(edges)
        .join('line')
        .attr('stroke', 'rgba(232,169,0,0.12)')
        .attr('stroke-width', d => 0.5 + strength(d) * 0.4)

      /*
        The tooltip is position:fixed, so it takes CLIENT coordinates and is
        clamped inside the viewport on both axes.
      */
      const TOOLTIP_W = 320
      const TOOLTIP_H = 170
      const CURSOR_DX = 12
      const EDGE = 8
      const clampTooltip = (clientX, clientY) => {
        const vw = window.innerWidth || document.documentElement.clientWidth
        const vh = window.innerHeight || document.documentElement.clientHeight
        return {
          x: Math.max(EDGE, Math.min(clientX, vw - TOOLTIP_W - CURSOR_DX - EDGE)),
          y: Math.max(EDGE, Math.min(clientY - 10, vh - TOOLTIP_H - EDGE)),
        }
      }

      const node = svg.append('g').selectAll('g')
        .data(nodes)
        .join('g')
        .attr('cursor', 'pointer')
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
        .on('mouseenter', (event, d) => {
          setTooltip({ node: d, ...clampTooltip(event.clientX, event.clientY) })
        })
        .on('mousemove', (event) => {
          const pos = clampTooltip(event.clientX, event.clientY)
          setTooltip(prev => prev ? { ...prev, ...pos } : prev)
        })
        .on('mouseleave', () => setTooltip(null))
        // d3-drag suppresses this click after a real drag, so dragging never navigates.
        .on('click', (event, d) => routerRef.current.push(topicHref(d.id)))
        /* Touch: a tap shows the tooltip; the theme links below the graph navigate. */
        .on('touchstart', (event, d) => {
          event.preventDefault()
          const t = event.touches[0]
          setTooltip({ node: d, ...clampTooltip(t.clientX, t.clientY) })
        }, { passive: false })
        .on('touchend', () => { setTimeout(() => setTooltip(null), 1500) })

      node.append('circle')
        .attr('r', d => d.r + 8)
        .attr('fill', 'none')
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.2)

      node.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => groupColors[d.group] + '22')
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#glow)')

      /* Paper count inside the node */
      node.append('text')
        .text(d => d.count)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-family', "'JetBrains Mono', monospace")
        .attr('font-size', '10px')
        .attr('fill', d => groupColors[d.group])

      node.append('text')
        .text(d => d.id)
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.r + 16)
        .attr('font-family', "'JetBrains Mono', monospace")
        .attr('font-size', '9px')
        .attr('fill', 'rgba(237,229,208,0.7)')

      sim.on('tick', () => {
        // keep nodes and their labels (≈5.5px per 9px mono character) inside the canvas
        nodes.forEach(d => {
          const half = Math.max(d.r, d.id.length * 2.75) + 4
          d.x = Math.max(half, Math.min(W - half, d.x))
          d.y = Math.max(d.r + 4, Math.min(H - d.r - 24, d.y))
        })
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
  }, [graph])

  const byCount = [...graph.nodes].sort((a, b) => b.count - a.count)

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
        aria-label={`Research graph: ${graph.nodes.length} themes across ${graph.paperCount} papers. The same themes are listed as links below.`}
        className="w-full rounded-sm"
        style={{ minHeight: 320, opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 justify-center">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
            <span className="font-mono text-xs text-parchment-400/60 capitalize">{group}</span>
          </div>
        ))}
        <span className="font-mono text-xs text-parchment-400/40 ml-2">
          · {isTouch ? 'tap a node for details' : 'click a node to see its papers · drag to explore'}
        </span>
      </div>

      {/* The same themes as real links: keyboard, screen-reader and touch friendly */}
      <nav aria-label="Browse papers by theme" className="mt-6 pt-5 border-t border-gold-500/10">
        <p className="font-mono text-xs text-parchment-400 mb-3">
          Built from {graph.paperCount} papers. Each number is the count of papers on that theme; open one to see them.
        </p>
        <ul className="flex flex-wrap gap-2">
          {byCount.map(n => (
            <li key={n.id}>
              <Link
                href={topicHref(n.id)}
                className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-parchment-300/15 rounded-sm text-parchment-300 hover:border-gold-500/40 hover:text-gold-300 transition-colors min-h-[36px]"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: groupColors[n.group] }} aria-hidden="true" />
                {n.id}
                <span className="text-gold-400">{n.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none"
            style={{ left: tooltip.x + 12, top: tooltip.y }}
          >
            <div className="glass-card border border-gold-500/25 p-3 max-w-xs shadow-xl">
              <p className="font-display text-base text-parchment-100 mb-1">{tooltip.node.id}</p>
              <p className="font-body text-xs text-parchment-400 leading-relaxed mb-2">{tooltip.node.description}</p>
              <p className="font-mono text-xs text-gold-400/70">
                {tooltip.node.count} paper{tooltip.node.count !== 1 ? 's' : ''}{isTouch ? '' : ' · click to view'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { researchNodes, researchEdges, groupColors } from '../data/researchThemes'

export default function ResearchGraph() {
  const svgRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let d3, sim, cleanup

    const init = async () => {
      try {
        d3 = await import('d3')
      } catch {
        setLoaded(true)
        return
      }

      const svg = d3.select(svgRef.current)
      const W = svgRef.current.clientWidth || 700
      const H = 420
      svg.attr('width', W).attr('height', H)
      svg.selectAll('*').remove()

      // Defs: glow filter
      const defs = svg.append('defs')
      const glow = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      glow.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur')
      const feMerge = glow.append('feMerge')
      feMerge.append('feMergeNode').attr('in', 'coloredBlur')
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

      // Simulate
      const nodes = researchNodes.map(n => ({ ...n }))
      const edges = researchEdges.map(e => ({ ...e }))

      sim = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(d => 90 + (3 - d.weight) * 20))
        .force('charge', d3.forceManyBody().strength(-260))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collision', d3.forceCollide().radius(d => d.size + 18))

      // Edges
      const link = svg.append('g').selectAll('line')
        .data(edges)
        .join('line')
        .attr('stroke', 'rgba(232,169,0,0.12)')
        .attr('stroke-width', d => d.weight * 0.8)

      // Nodes group
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
            .on('end', (event, d) => {
              if (!event.active) sim.alphaTarget(0)
              d.fx = null; d.fy = null
            })
        )
        .on('mouseenter', (event, d) => {
          setHovered(d.id)
          setTooltip({ node: d, x: event.pageX, y: event.pageY })
        })
        .on('mousemove', (event) => {
          setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : prev)
        })
        .on('mouseleave', () => {
          setHovered(null)
          setTooltip(null)
        })

      // Outer ring
      node.append('circle')
        .attr('r', d => d.size + 8)
        .attr('fill', 'none')
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.2)

      // Main circle
      node.append('circle')
        .attr('r', d => d.size)
        .attr('fill', d => {
          const col = groupColors[d.group]
          return col + '22'
        })
        .attr('stroke', d => groupColors[d.group])
        .attr('stroke-width', 1.5)
        .attr('filter', 'url(#glow)')

      // Label
      node.append('text')
        .text(d => d.label)
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.size + 16)
        .attr('font-family', "'JetBrains Mono', monospace")
        .attr('font-size', '9px')
        .attr('fill', 'rgba(237,229,208,0.65)')

      sim.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-mono text-xs text-parchment-400 animate-pulse">Initializing graph…</div>
        </div>
      )}
      <svg
        ref={svgRef}
        className="w-full rounded-sm"
        style={{ minHeight: 420, opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-mono text-xs text-parchment-400/60 capitalize">{group}</span>
          </div>
        ))}
        <span className="font-mono text-xs text-parchment-400/40 ml-2">· drag to explore</span>
      </div>

      {/* Hover tooltip — rendered outside SVG */}
      <AnimatePresence>
        {tooltip && hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none"
            style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
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

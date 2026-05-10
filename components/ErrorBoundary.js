import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-8 text-center border border-red-500/20">
          <p className="font-mono text-xs text-red-400 mb-2 uppercase tracking-widest">Component Error</p>
          <p className="font-body text-sm text-parchment-300">
            {this.props.message || "Failed to load this component. Please refresh the page."}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: 'red' }}>Something went wrong.</h1>
          <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: '5px', border: '1px solid #f5c6cb' }}>
            <h3>Error Details:</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error && this.state.error.toString()}</pre>
            <br />
            <strong>Check your Console (F12) for more details.</strong>
          </div>
          <p>
            This usually happens if your <code>.env</code> file is missing or incorrect.
          </p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

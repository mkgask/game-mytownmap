import React, { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  /**
   * Component to render when an error occurs
   */
  fallback: React.ComponentType<{ error: Error; resetError: () => void }>;

  /**
   * Callback fired when an error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;

  /**
   * Keys that trigger boundary reset when changed
   */
  resetKeys?: Array<string | number>;

  /**
   * Children components to protect
   */
  children: ReactNode;
}

/**
 * State for the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The caught error */
  error: Error | null;
}

/**
 * Default fallback UI component for error boundary.
 */
const DefaultFallback: React.ComponentType<{ error: Error; resetError: () => void }> = ({
  error,
  resetError
}) => (
  <div style={{
    padding: '20px',
    margin: '20px',
    border: '1px solid #ff6b6b',
    borderRadius: '8px',
    backgroundColor: '#ffeaea',
    color: '#d63031'
  }}>
    <h2>Something went wrong</h2>
    <details style={{ whiteSpace: 'pre-wrap' }}>
      <summary>Error Details</summary>
      <p><strong>Error:</strong> {error.message}</p>
      <p><strong>Stack:</strong> {error.stack}</p>
    </details>
    <button
      onClick={resetError}
      style={{
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: '#0984e3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Try Again
    </button>
  </div>
);

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * This component follows React's Error Boundary pattern and is compatible with Astro.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Lifecycle method called when an error occurs in a descendant component.
   * Used to update state and trigger fallback UI rendering.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error has been thrown by a descendant component.
   * Used for side effects like error logging.
   */
  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  /**
   * Lifecycle method called after the component updates.
   * Used to reset the error boundary when resetKeys change.
   */
  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && this.hasResetKeysChanged(prevProps.resetKeys, resetKeys)) {
      this.resetError();
    }
  }

  /**
   * Check if resetKeys have changed.
   */
  private hasResetKeysChanged(
    prevResetKeys: Array<string | number> | undefined,
    resetKeys: Array<string | number> | undefined
  ): boolean {
    if (!prevResetKeys && !resetKeys) return false;
    if (!prevResetKeys || !resetKeys) return true;

    if (prevResetKeys.length !== resetKeys.length) return true;

    for (let i = 0; i < resetKeys.length; i++) {
      if (prevResetKeys[i] !== resetKeys[i]) return true;
    }

    return false;
  }

  /**
   * Reset the error boundary state.
   */
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  /**
   * Render the component.
   * Shows fallback UI if an error occurred, otherwise renders children.
   */
  override render() {
    const { hasError, error } = this.state;
    const { fallback: Fallback, children } = this.props;

    if (hasError && error) {
      return <Fallback error={error} resetError={this.resetError} />;
    }

    return children;
  }
}

/**
 * Convenience component that uses the default fallback UI.
 */
export const ErrorBoundaryWithDefaultFallback: React.FC<{
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}> = ({ children, onError, resetKeys }) => (
  <ErrorBoundary
    fallback={DefaultFallback}
    onError={onError}
    resetKeys={resetKeys}
  >
    {children}
  </ErrorBoundary>
);
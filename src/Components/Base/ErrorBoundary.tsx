import { Component, type ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}

import React, { ErrorInfo } from "react";

interface IProps {
  children: React.ReactNode;
  screen: string;
}

interface IState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return <div>{this.props.screen} Crashed</div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;

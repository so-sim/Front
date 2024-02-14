import { Component, PropsWithChildren } from 'react';

import { AxiosError } from 'axios';
import Page404 from '@/components/error/404';

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      showError: false,
    };
    this.handleErrorReset = this.handleErrorReset.bind(this);
  }

  handleErrorReset() {
    this.setState({ showError: false });
  }

  static getDerivedStateFromError(err: Error) {
    console.log(err);
    if (err.name === 'TypeError') {
      return {
        showError: true,
      };
    }

    if (err instanceof AxiosError) {
      if (err.response?.status === 500 || err.response?.status === 401) {
        return {
          showError: true,
        };
      }
    }

    return {
      showError: true,
    };
  }

  render() {
    // console.log(this.state.showError);
    // if (this.state.showError) return <div>반갑</div>;

    return this.props.children;
  }
}

export default ErrorBoundary;

interface ErrorBoundaryState {
  showError: boolean;
}

import { Container, Paper, Typography } from "@mui/material";
import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";
import InformationBox from "./components/InformationBox";

interface IProps {
  children: ReactElement;
}

class ErrorBoundary extends Component<IProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <InformationBox message="There was an error. Go back to homepage" />
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

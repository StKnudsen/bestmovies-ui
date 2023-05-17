import { Container, Paper, Typography } from "@mui/material";
import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

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
          <Paper elevation={3}>
            <Typography variant="h5" textAlign={"center"} mt={12} py={8}>
              There was an error. <Link to="/">Click here</Link> to back to the
              home page.
            </Typography>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

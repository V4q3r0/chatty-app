import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase-config";

function PrivateRoute({ element: Element, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Element {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ element: Element, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Element {...props} />
        ) : (
          <Navigate to="/chat" />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            element={<Chat />}
          />
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            element={<Signup />}
          />
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            element={<Login />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
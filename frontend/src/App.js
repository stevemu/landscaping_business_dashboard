import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import './App.css';
import Snackbar from '@material-ui/core/Snackbar';

import Dashboard from './components/dashboard/Dashboard';
import LoginController from './components/login/LoginController';
import PrivateRoute from './core/PrivateRoute';
import AuthContext from './core/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import MySnackbarContentWrapper from "./core/MySnackbarContentWrapper";

import {getAuthed, getLocalToken} from "./core/utils";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            isAuthenticated: true,
            snackMessage: null,
            snackVariant: null,
        }
    }

    async componentDidMount() {
        // check if the token is stored
        let token = getLocalToken();
        if (token) {
            this.setAuthenticated(true);
        }
    }

    setAuthenticated = (isAuthenticated) => {
        // console.log(isAuthenticated);
        this.setState({isAuthenticated})
    };


    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackMessage: null});
    };

    setSnack = (snackMessage, snackVariant) => {
        this.setState({snackMessage, snackVariant});
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <AuthContext.Provider value={{
                    isAuthenticated: this.state.isAuthenticated,
                    setAuthenticated: this.setAuthenticated,
                    setSnack: this.setSnack
                }}>
                    <div className="App">
                        <Router>
                            <Route path="/login" component={LoginController}/>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/dashboard"/>
                            }}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                        </Router>
                    </div>
                </AuthContext.Provider>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackMessage ? true : false}
                    autoHideDuration={6000}
                    onClose={this.handleSnackClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleSnackClose}
                        variant={this.state.snackVariant}
                        message={this.state.snackMessage}
                    />
                </Snackbar>
            </React.Fragment>

        );
    }

}

export default App;

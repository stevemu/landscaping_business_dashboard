import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import AuthContext from '../core/AuthContext';

class Home extends Component {
    render() {
        let {component: Component, ...rest} = this.props;
        return (
            <AuthContext.Consumer>
                {({isAuthenticated}) => (
                    <Route
                        {...rest}
                        render={props =>
                            isAuthenticated ? (
                                <Redirect
                                    to={{
                                        pathname: "/dashboard",
                                        state: {from: props.location}
                                    }}
                                />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: {from: props.location}
                                    }}
                                />
                            )
                        }
                    />
                )}
            </AuthContext.Consumer>

        );
    }

}

export default Home;
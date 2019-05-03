import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import AuthContext from '../core/AuthContext';

class PrivateRoute extends Component {
    render() {
        let {component: Component, ...rest} = this.props;

        return (
            <AuthContext.Consumer>
                {({isAuthenticated}) => (
                    <Route
                        {...rest}
                        render={props =>
                            isAuthenticated ? (
                                <Component {...props} />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: {from: this.props.location}
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

export default PrivateRoute;
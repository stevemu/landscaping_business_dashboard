import React, {Component} from "react";
import LoginView from './LoginView';
import AuthContext from '../../core/AuthContext';
import {post} from "../../core/utils";

import {dashboardRoot} from "../dashboard/Dashboard";
import {getLocalToken} from "../../core/utils";

class LoginController extends Component {

    componentDidMount() {
        // let token = getLocalToken();
        // if (token) {
        //     this.props.history.push(dashboardRoot);
        //
        // }
    }

    render() {
        return (
            <AuthContext.Consumer>
                {({setAuthenticated, setSnack}) => (
                    <LoginView
                        loginPressed={async (username, password) => {

                            try {
                                let res = await post("/api/auth/signin", {
                                    username,
                                    password
                                });

                                if (res.status) { // have error
                                    throw new Error("Error logging in")
                                }

                                localStorage.setItem("token", res.token);
                                localStorage.setItem("refreshToken", res.refreshToken);

                                // console.log(res);
                                setAuthenticated(true);

                                // redirect
                                this.props.history.push(dashboardRoot);

                            } catch (e) {
                                setSnack("Error logging in!", "error")
                            }


                        }}
                    />
                )}
            </AuthContext.Consumer>
        )
    }
}

export default LoginController;
import React, {Component} from "react";

export default React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => {},
    setSnack: () => {}
});
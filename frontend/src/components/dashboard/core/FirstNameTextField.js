import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function FirstNameTextField(props) {

    return (
        <TextField
            {...props}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
        />
    )
}

export default FirstNameTextField;

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function LastNameTextField(props) {

    return (
        <TextField
            {...props}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
        />
    )
}

export default LastNameTextField;

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {customersPath} from "../Dashboard";

import Person from "../core/Person";

const styles = {};


class Customer extends React.Component {
    render() {
        let {classes} = this.props;

        return (
            <Person
                {...this.props}
                redirectRoute={customersPath}
            />
        )

    }
}

export default withStyles(styles)(Customer);

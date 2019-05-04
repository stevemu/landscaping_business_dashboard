import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import {workersPath} from "../Dashboard";
import Person from "../core/Person";

const styles = theme => ({
});

class Worker extends React.Component {
    render() {
        const { classes, theme } = this.props;
        return (
            <Person
                {...this.props}
                redirectRoute={workersPath}
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(Worker);
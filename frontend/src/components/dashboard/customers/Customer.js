import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {customersPath} from "../Dashboard";

import PersonDetail from "../core/PersonDetail";

const styles = {
};


class Customer extends React.Component {
    render() {
        let {classes} = this.props;

        return (
            <div>
                <PersonDetail
                    {...this.props}
                    redirectRoute={customersPath}
                />
            </div>
        )

    }
}

export default withStyles(styles)(Customer);

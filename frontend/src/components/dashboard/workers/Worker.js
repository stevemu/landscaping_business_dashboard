import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {workersPath} from "../Dashboard";

import PersonDetail from "../core/PersonDetail";

const styles = {
};

class Worker extends React.Component {

    render() {
        let {classes} = this.props;

        return (
            <div>
                <PersonDetail
                    {...this.props}
                    redirectRoute={workersPath}
                />
            </div>
        )

    }


}

export default withStyles(styles)(Worker);

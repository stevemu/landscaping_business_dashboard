import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FullScreenWithCloseModal from '../../../core/FullScreenWithCloseModal';

import Customer from './Customer';
import {customersPath} from '../Dashboard';

const styles = () => ({
    button: {
        margin: 3,
        textAlign: "right"
    }
});

class CustomerModal extends React.Component {

    handleClose = () => {
        this.props.history.push(customersPath)
    }

    render() {
        const {classes, ...rest} = this.props;
        return (
            <FullScreenWithCloseModal handleClose={this.handleClose}>
                <Customer {...rest} />
            </FullScreenWithCloseModal>
        );
    }
}

export default withStyles(styles)(CustomerModal);

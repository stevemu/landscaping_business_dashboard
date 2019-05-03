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
        const {classes} = this.props;
        return (
            <FullScreenWithCloseModal handleClose={this.handleClose}>
                <Customer {...this.props} />
            </FullScreenWithCloseModal>
        );
    }
}

export default withStyles(styles)(CustomerModal);

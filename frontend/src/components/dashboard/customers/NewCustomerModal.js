import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import NewCustomer from './NewCustomer';
import {workersPath} from '../Dashboard';
import FullScreenWithCloseModal from "../../../core/FullScreenWithCloseModal";

const styles = theme => ({

});

class NewCustomerModal extends React.Component {

    handleClose = () => {
        this.props.history.push(workersPath)
    }

    render() {
        const {classes} = this.props;
        return (
            <FullScreenWithCloseModal handleClose={this.handleClose}>
                <NewCustomer {...this.props} />
            </FullScreenWithCloseModal>
        );
    }
}

export default withStyles(styles)(NewCustomerModal);

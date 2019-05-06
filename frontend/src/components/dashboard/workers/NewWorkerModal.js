import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import FullScreenModal from '../../../core/FullScreenModal';
import NewWorker from './NewWorker';
import {workersPath} from '../Dashboard';
import FullScreenWithCloseModal from "../../../core/FullScreenWithCloseModal";

const styles = theme => ({

});

class NewWorkerModal extends React.Component {

    handleClose = () => {
        this.props.history.push(workersPath)
    }

    render() {
        const {classes} = this.props;
        return (
            <FullScreenWithCloseModal handleClose={this.handleClose}>
                <NewWorker {...this.props} handleClose={this.handleClose} />
            </FullScreenWithCloseModal>
        );
    }
}

export default withStyles(styles)(NewWorkerModal);

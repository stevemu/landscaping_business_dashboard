import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Worker from './Worker';
import {workersPath} from '../Dashboard';
import FullScreenWithCloseModal from "../../../core/FullScreenWithCloseModal";

const styles = theme => ({

});

class WorkerModal extends React.Component {

    handleClose = () => {
        this.props.history.push(workersPath)
    }

    render() {
        const {classes} = this.props;
        return (
            <FullScreenWithCloseModal handleClose={this.handleClose}>
                <Worker {...this.props} />
            </FullScreenWithCloseModal>
        );
    }
}

export default withStyles(styles)(WorkerModal);

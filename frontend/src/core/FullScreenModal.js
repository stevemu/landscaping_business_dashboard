import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        display: "flex",
        flexDirection: "column"
    }
});

class WorkerModal extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Modal open={true} >
                    <div className={classes.paper}>
                        {this.props.children}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(WorkerModal);

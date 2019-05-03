import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import FullScreenModal from "./FullScreenModal";


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    button: {
        margin: 3,
        alignSelf: "flex-end",
    }
});

class FullScreenWithCloseModal extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <FullScreenModal>
                <IconButton onClick={this.props.handleClose} className={classes.button}>
                    <CancelIcon />
                </IconButton>
                {this.props.children}
            </FullScreenModal>
        );
    }
}

export default withStyles(styles)(FullScreenWithCloseModal);

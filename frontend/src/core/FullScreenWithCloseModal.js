import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import FullScreenModal from "./FullScreenModal";


const styles = theme => ({
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

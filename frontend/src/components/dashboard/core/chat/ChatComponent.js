import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chat from './Chat';

const styles = theme => ({

});

class ChatComponent extends React.Component {

    render() {
        const {classes} = this.props;

        return (
           <Chat />
        );
    }
}

export default withStyles(styles)(ChatComponent);
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MessageList from './MessageList';
import withChatThemeProvider from '../../../../core/withChatThemeProvider';
import {Row, SendButton, TextComposer, TextInput} from "@livechat/ui-kit";

const styles = theme => ({});


class ChatComponent extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <MessageList/>
                <TextComposer style={{position: "absolute", bottom: 0, width: "100%", paddingRight: 40, paddingBottom: 15}}>
                    <Row align="center">
                        <TextInput fill/>
                        <SendButton fit/>
                    </Row>
                </TextComposer>
            </div>

        );
    }
}

export default withStyles(styles)(ChatComponent);
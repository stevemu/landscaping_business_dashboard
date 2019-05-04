import React from 'react';
import {
    ThemeProvider,
    MessageList,
    MessageGroup,
    Message,
    MessageMedia,
    MessageTitle,
    MessageText,
    MessageButtons,
    MessageButton
} from '@livechat/ui-kit';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        maxWidth: "100%"
    }
});

const theme = {
    vars: {
        'primary-color': '#427fe1',
        'secondary-color': '#fbfbfb',
        'tertiary-color': '#fff',
        'avatar-border-color': 'blue',
    },
    AgentBar: {
        Avatar: {
            size: '42px',
        },
        css: {
            backgroundColor: 'var(--secondary-color)',
            borderColor: 'var(--avatar-border-color)',
        }
    },
    Message: {
        css: {
            fontWeight: 'bold',
        },
    }
}

class Chat extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <ThemeProvider theme={theme}>
                <MessageList active>
                    <Message date="21:38" isOwn={true} authorName="Me">
                        <MessageText>
                            I love them so
                            much!
                        </MessageText>
                    </Message>
                    <Message date="21:38" isOwn={true} authorName="Me">
                        <MessageText>This helps me a lot</MessageText>
                    </Message>
                    <Message date="21:38" isOwn={true} authorName="Me">
                        <MessageText>
                            I love them so much!
                        </MessageText>
                    </Message>
                    <Message date="21:38" isOwn={true} authorName="Me">
                        <MessageText>This helps me a lot</MessageText>
                    </Message>
                    <Message authorName="7188641267" date="21:37">
                        <MessageText>No problem!</MessageText>
                    </Message>
                    <Message authorName="7188641267">
                        <MessageText>
                            The fastest way to help your customers - start chatting with visitors
                            who need your help using a free 30-day trial.
                        </MessageText>
                    </Message>
                    <Message authorName="7188641267" date="21:39">
                        <MessageMedia>
                            <img className={classes.image}
                                 src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"/>
                        </MessageMedia>
                    </Message>
                    <Message authorName="7188641267" date="21:39">
                        <MessageMedia>
                            <img className={classes.image}
                                 src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"/>
                        </MessageMedia>
                    </Message>
                </MessageList>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Chat);
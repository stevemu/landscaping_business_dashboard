import React from 'react';
import {
    ThemeProvider
} from '@livechat/ui-kit';


const theme = {
    Message: {
        MessageText: {
            css: {
                fontWeight: "normal"
            }
        },
        css: {
            fontWeight: 'bold',
        },
    }
}

function withChatThemeProvider(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <ThemeProvider theme={theme}>
                    <WrappedComponent {...this.props} />
                </ThemeProvider>
            );
        }


    }
}


export default withChatThemeProvider;


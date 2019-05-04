import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import withResizeAware from '../../../core/withResizeAware';

const styles = {
    root: {
        flex: 1,
        padding: 10
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr",
        overflow: "hidden",
    },
    left: {
        overflow: "scroll",
        marginRight: 5,
        paddingBottom: 150
    },
    right: {
        // overflow: "scroll",
    }
};

class MasterDetail extends React.Component {

    render() {
        const {classes} = this.props;
        let containerHeight = this.props.height - 120;

        return (
            <div className={classes.root}>
                <div className={classes.container} style={{
                    height: containerHeight,
                    gridTemplateColumns: this.props.width >= 600 ? "200px 1fr" : "1fr",
                }}>
                    <div className={classes.left}>
                        {this.props.master()}
                    </div>
                    {
                        this.props.width >= 600 &&
                        <div className={classes.right}>
                            {this.props.detail()}
                        </div>
                    }
                </div>
            </div>
        )


    }

}


export default withResizeAware(withStyles(styles)(MasterDetail));


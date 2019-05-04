import React from 'react';

function withResizeAware(WrappedComponent) {
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth
            }
        }

        componentDidMount() {
            window.addEventListener("resize", this.handleResize);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }

        handleResize = (e) => {
            this.setState({
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth
            })
        }

        render() {

            return (
                <div>
                    <WrappedComponent height={this.state.height} width={this.state.width} {...this.props} />
                </div>
            );
        }


    }
}




export default withResizeAware;


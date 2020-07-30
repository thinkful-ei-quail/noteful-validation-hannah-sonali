import React, { Component } from 'react'

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if(this.state.hasError) {
            return (
                <h2>Could not display page. Please go back to the homepage.</h2>

            );
        }
        return this.props.children;
    }
}
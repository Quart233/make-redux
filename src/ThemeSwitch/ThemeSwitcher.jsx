import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitcher extends Component {
    constructor () {
        super()
        this.state = { themeColor: '' }
    }

    static contextTypes = {
        store: PropTypes.object
    }
    
    componentDidMount () {
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }
    handleSwitchColor (color) {
        const { store } = this.context
        store.dispatch({
            type: 'CHANGE_COLOR',
            themeColor: color
        })
    }

    render () {
        return (
            <div>
                <button 
                style={{ color: this.state.themeColor }}
                onClick={ this.handleSwitchColor.bind(this, 'red')}
                >Red</button>
                <span> </span>
                <button 
                style={{ color: this.state.themeColor }}
                onClick={ this.handleSwitchColor.bind(this, 'blue')}
                >blue</button>
            </div>
        )
    }
}

export default ThemeSwitcher
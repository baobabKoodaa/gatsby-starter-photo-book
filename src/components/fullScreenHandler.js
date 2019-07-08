import React from "react"
import screenfull from "screenfull"

/* We want to enter fullscreen on small screens in postcard mode, but exit upon returning to gallery. */
export class FullScreenHandler extends React.Component {

    constructor(props) {
        super(props)
        this.enterFullScreen.bind(this)
        this.exitFullScreen.bind(this)
        this.state = {
            fullScreen: props.fullScreen
        }
    }

    enterFullScreen() {
        if (typeof document === 'undefined') return
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (width <= 1200 && screenfull.enabled) {
            screenfull.request();
        }
    }

    exitFullScreen() {
        if (typeof document === 'undefined') return
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (width <= 1200 && screenfull.enabled) {
            screenfull.exit()
        }
    }

    render() {
        if (this.state.fullScreen) this.enterFullScreen()
        else this.exitFullScreen()

        return (
            <></>
        )
    }
}
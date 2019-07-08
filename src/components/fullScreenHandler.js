import React from "react"
import screenfull from "screenfull"

/* We want to enter fullscreen on small screens in postcard mode, but exit upon returning to gallery. */
export class FullScreenHandler extends React.Component {

    constructor(props) {
        super(props)
        this.getWidth.bind(this)
        this.state = {
            view: props.view
        }
    }

    getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    render() {
        if (typeof document === 'undefined' || !screenfull.enabled) return <></>
        if (this.state.view === 'postcard' && this.getWidth() <= 1200) {
            screenfull.request()
        } else {
            screenfull.exit()
        }
        return <></>
    }
}
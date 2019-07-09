import React from "react"

/* This is used to handle a corner case where the user browses many photos and
 * then returns to the gallery by clicking 'x'. We're trying to anchor to the
 * thumbnail corresponding to the last photo that the user viewed. However,
 * it may be possible that the gallery hasn't yet fetched metadata for thumbnails
 * so far down. In this case, clicking 'x' causes the anchor link to fail and
 * the user encounters an unfamiliar scroll position. To avoid this issue we want
 * to keep gallery metadata up to date as we browse photos in postcard view. */
export class CornerCaseHandler extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            alreadyFetched: false,
            g: props.g,
            currId: props.currId,
            nextId: props.nextId
        }
    }

    componentDidMount() {
        if (this.state.alreadyFetched) {
            return
        }
        this.setState({
            alreadyFetched: true
        })
    
        const g = this.state.g
        const lastFetchedPage = "page" + (g.cursor-1)
        if (!g[lastFetchedPage]) {
            /* Another corner case: user enters postcard view without visiting gallery.
             * Note that we are not properly handling this case (we should fetch enough
             * metadata up to whichever image the user is looking at - instead we only
             * fetch 1 page worth of metadata items per each photo that the user views.) */
            g.loadMore()
            return
        }
        const p = g[lastFetchedPage]
        if (p.length === 0) {
            /* This shouldn't happen but if it does we don't want to crash. */
            return
        }
        if (p[p.length-1].id < (this.state.nextId)) {
            /* If we are almost at the last photo with thumbnail metadata,
            * then fetch more metadata (thumbnail _data_ will not be fetched yet). */
            g.loadMore()
        }
    }

    render() {
        return (
            <></>
        )
    }
}
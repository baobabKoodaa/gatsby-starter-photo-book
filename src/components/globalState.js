import React from "react"

/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const GlobalStateContext = React.createContext({
    cursor: 1, /* Which page infinite scroll should fetch next. */
    useInfiniteScroll: true, /* Fallback to pagination in case of error. */
    isInitializing: () => {},
    updateState: () => {},
    hasMore: () => {},
    loadMore: () => {},
    flashCueShown: false
});

export class GlobalState extends React.Component {

    constructor(props) {
        super(props)

        this.loadMore = this.loadMore.bind(this)
        this.hasMore = this.hasMore.bind(this)
        this.updateState = this.updateState.bind(this)
        this.isInitializing = this.isInitializing.bind(this)
        
        /* State also contains metadata for items, e.g. state["page81"] (only contains keys for _received_ metadata) */
        this.state = {
            cursor: 1,
            useInfiniteScroll: true,
            isInitializing: this.isInitializing,
            updateState: this.updateState,
            hasMore: this.hasMore,
            loadMore: this.loadMore,
            initialRender: true,
            flashCueShown: false
        }
    }

    componentDidMount() {
        this.setState({
            initialRender: false
        })
    }

    isInitializing = () => {
        return (this.state.cursor === 1)
    }

    updateState = (mergeableStateObject) => {
        this.setState(mergeableStateObject)
    }

    loadMore = () => {
        const pageNum = this.state.cursor
        this.setState(state => ({ cursor: state.cursor+1 })) // TODO: make sure this is guaranteed to set state before another loadMore may be able to fire!
        fetch(`${__PATH_PREFIX__}/paginationJson/index${pageNum > 1 ? pageNum : ""}.json`)
          .then(res => res.json(), error => {}) //In some cases cornerCaseHandler tries to fetch pages that don't exist. TODO fix. Until then, suppress these harmless errors.
          .then(
            res => {
              this.setState({
                  ["page"+pageNum]: res
              })
            },
            error => {
                
            }
        )
    }

    hasMore = (pageContext) => {
        if (!this.state.useInfiniteScroll) return false
        if (this.isInitializing()) return true
        return this.state.cursor <= pageContext.countPages
    }

    render() {
        return (
            <GlobalStateContext.Provider value={this.state}>
                {this.props.children}
            </GlobalStateContext.Provider>
        )
    }

}
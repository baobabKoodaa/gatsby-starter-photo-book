import screenfull from "screenfull"

function userHasSmallScreen() {
    if (typeof document === 'undefined') return false /* Build time render by Gatsby. */
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (width <= 1200)
}

export function maybeEnterFullScreen() {
    if (!screenfull.enabled) return /* Browser prevents full screen or problem with library. */
    if (userHasSmallScreen()) {
        screenfull.request()
    }
}

export function exitFullScreen() {
    if (!screenfull.enabled) return /* Browser prevents full screen or problem with library. */
    if (screenfull.isFullscreen) {
        screenfull.exit()
    }
}
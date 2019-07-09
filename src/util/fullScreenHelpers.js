import screenfull from "screenfull"

export function enterFullScreen() {
    if (typeof document === 'undefined') return /* Build time render by Gatsby. */
    if (!screenfull.enabled) return /* Browser prevents full screen or problem with library. */
    screenfull.request()
}

export function exitFullScreen() {
    if (typeof document === 'undefined') return /* Build time render by Gatsby. */
    if (!screenfull.enabled) return /* Browser prevents full screen or problem with library. */
    if (screenfull.isFullscreen) {
        screenfull.exit()
    }
}
import React from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export class FlashCue extends React.Component {

    constructor(props) {
        super(props)
        this.wait = 1000 + props.additionalWait
        this.startShowingFlash = this.startShowingFlash.bind(this)
        this.zIndex = props.zIndex
        this.state = {
            g: props.g,
            flashStarted: false
        }
    }

    startShowingFlash() {
        this.setState({ flashStarted: true })
        const setBoolFlashCueShown = () => this.state.g.updateState({ flashCueShown: true })
        this.timer = setTimeout(setBoolFlashCueShown, this.wait/2)
    }

    componentDidMount() {
        if (!this.state.g.flashCueShown) {
            this.timer = setTimeout(this.startShowingFlash, this.wait)
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    render() {
        return (
            <>
                {this.state.flashStarted && (
                    <>
                        <FaArrowLeft className="flashCue" style={{ left: "10vw" }} />
                        <FaArrowRight className="flashCue" style={{ right: "10vw" }} />
                    
                        <style jsx>{`
                            :global(.flashCue) {
                                top: 50%;
                                transform: translateY(-50%);
                            
                                opacity: 0;
                                font-size: 20px;
                                animation: flash 4s linear;
                                z-index: ${this.zIndex};
                            }

                            @media only screen and (max-width: 1200px) {
                                @keyframes flash {
                                    0%, 100% {
                                        opacity: 0;
                                        transform: scale(1);
                                    }
                                    50% {
                                        opacity: 0.7;
                                        transform: scale(2);
                                    }
                                }
                            }

                            
                        `}</style>
                    </>
                )}
            </>
        )
    }
}
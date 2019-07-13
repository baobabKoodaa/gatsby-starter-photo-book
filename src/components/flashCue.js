import React from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export class FlashCue extends React.Component {

    constructor(props) {
        super(props)
        this.wait = 0 + props.additionalWait
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
                                        -webkit-filter: blur(3px);
                                        -moz-filter: blur(3px);
                                        -o-filter: blur(3px);
                                        -ms-filter: blur(3px); 
                                        filter: blur(3px);
                                        filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
                                    }
                                    50% {
                                        opacity: 1;
                                        transform: scale(2);
                                        -webkit-filter: blur(0px);
                                        -moz-filter: blur(0px);
                                        -o-filter: blur(0px);
                                        -ms-filter: blur(0px); 
                                        filter: blur(0px);
                                        filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='0');
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
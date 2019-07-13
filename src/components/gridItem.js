import React from "react"
import { navigate } from "gatsby"
//import theme from "../theme.yaml"

class GridItem extends React.Component {

    handleNavigation(e) {
        /* This unconventional navigation is explained in README. */
        navigate(
            `/images/fromGallery?id=${this.props.item.id}`,
            {
                state: { pageContext: this.props.item.pageContext }
            }
        )
        e.preventDefault()
        return false;
    }

    render() {
        const props = this.props
        const highlight = (props.item && props.highlight === props.item.id)

        return (
            <React.Fragment>
                
                <div className="img-container" key={props.index}>
    
                    {props.item && (
                        <>
                            {/* 
                              * The span is used for anchoring scroll position when the user clicks 'x' to return to main page.
                              * Do not refactor the id into Link or Chrome will sometimes scroll into _middle_ of img instead of top.
                              * Do not refactor the hidden dot away or Firefox will set scroll position to the _bottom_ of img instead of top.
                              */}
                            <span id={`id${props.item.id}`} style={{ top: "0px", position: "absolute", display: "hidden" }} >.</span>
                            <a href={`/images/${props.item.id}`} onClick={(e) => this.handleNavigation(e)} >
                                <img src={props.item.thumb.src} alt="" title="" />
                            </a>
                        </>
                    )}
                    
                </div>
                <style jsx>
                    {`
                        @keyframes animate-opacity {
                            0% { opacity: 0; }
                            100% { opacity: 1; }
                        }
    
                        .img-container {
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            -webkit-box-sizing: border-box;
                            position: relative;
                            width: 100%;
                            height: 100%;
                            background: #EEE;
                            border-radius: 5px;
                            border: 1px solid ghostwhite;
                            overflow: hidden;
                            z-index: 1;
                            animation: ${highlight ? "3s" : "0s"} ease-in-out 0s 1 animate-opacity;
                        }
    
                        .img-container::before {
                            content: '';
                            display: block;
                            margin-top: 67%;
                            z-index: 1;
                        }
    
                        .img-container img {
                            top: 0;
                            display: block;
                            position: absolute;
                            width: 100%;
                            height: auto;
                            margin: 0 !important;
                            border-radius: 5px;
                            border: 1px solid gray;
                            transition: 0.2s ease-in-out;
                            z-index: 2;
    
                            opacity: 1;
                            :hover {
                                opacity: 0.4;
                                transform: scale(1.1);
                            }
                        }
                    `}
                </style>
            </React.Fragment>
        )
    }

    
}

export default GridItem
import React from "react"
import { Link } from "gatsby"
import theme from "../theme.yaml"

const GridItem = props => {

    const highlight = (props.item && props.highlight === props.item.id)

    return (
        <React.Fragment>
            
            <div className="img-container" key={props.index}>

                {props.item && (
                    <>
                        {/* 
                          * The span is used for anchoring scroll position when the user clicks 'x' to return to main page.
                          * Do not refactor the id into Link or Chrome will sometimes scroll into _middle_ of img instead of top.
                          */}
                        <span id={`id${props.item.id}`}></span>
                        <Link to={`/images/${props.item.id}`}>
                            <img src={props.item.s} alt="" title="" />
                        </Link>
                    </>
                )}
                
            </div>
            <style jsx>
                {`
                    .img-container {
                        box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        position: relative;
                        width: 100%;
                        height: 100%;
                        background: ${highlight ? theme.color.brand.primaryLight : "#EEE"};
                        border-radius: 5px;
                        border: 1px solid ghostwhite;
                        overflow: hidden;
                        z-index: 1;
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

                        opacity: ${highlight ? 0.2 : 1};
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

export default GridItem
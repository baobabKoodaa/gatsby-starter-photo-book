import React from "react"
import config from "../config.yaml"

export default class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this)

        this.textPhotographer = 
            <span>
                <a href={config.linkPhotographer} target="_blank" rel="noopener noreferrer">
                    Hannu Tiainen
                </a> oli mahtava valokuvaajamme. Osa sivulla näkyvistä kuvista on myös ihanien vieraidemme ottamia. Jos mietit yksittäisen kuvan alkuperää, saat joitakin tietoja pitämällä hiirtä suurikokoisen kuvan päällä.
            </span>

        this.textDownload = 
            <span>
                Voit ladata yksittäisiä kuvia avaamalla kuvan ja painamalla kuvan alla näkyvää latauspainiketta. Jos haluat ladata kaikki kuvat ZIP-pakettina,
                paina <a href={config.linkPhotoset} target="_blank" rel="noopener noreferrer">tästä</a>.
            </span>

		this.state = {
			showMoreText: false,
		};
    }	
    
    handleTextChange(showMoreText) {
		this.setState((prevState, props) => {
            if (prevState.showMoreText === showMoreText) {
                return { showMoreText: false }
            }
            return { showMoreText: showMoreText }
		})
    }

    componentDidUpdate(prevProps, prevState) {
        /* handleTextChange shows text under footer, so we want to scroll down to see the text.
         * It's not a big jump; the text appears right under the link that the user clicked. */
        if (!prevState.showMoreText && this.state.showMoreText) {
            window.scrollTo(0, 100000);
        }
    }

    render() {

        return(
            <footer>
                <br/><br/>
                <center>
                    <p>
                        <span onClick={() => this.handleTextChange(this.textDownload)} style={{ cursor: "pointer" }}>
                            Lataa kuvat 
                        </span> | <a href={config.linkSource} target="_blank" rel="noopener noreferrer">
                            Sivun lähdekoodi
                        </a> | <span onClick={() => this.handleTextChange(this.textPhotographer)} style={{ cursor: "pointer" }}>
                            Kameran takana
                        </span>
                        <p style={{ maxWidth: "400px", color: "black", display: this.state.showMoreText ? "block" : "none" }}>
                            {this.state.showMoreText}
                        </p>

                    </p>
                    
                </center>
                <br/>
            </footer>
        )
    }
}
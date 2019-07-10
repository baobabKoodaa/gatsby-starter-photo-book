import React from "react"

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
		this.state = {
			showMoreText: false,
		};
    }	
    
    toggle() {
		this.setState((prevState, props) => { return {
			showMoreText: !prevState.showMoreText
		}})
    }

    componentDidUpdate(prevProps, prevState) {
        /* The toggle action shows text under footer, so we want to scroll down to see the text.
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
                        <a href="https://drive.google.com/file/d/1XYZu3c6Z0XQ8nLFWIW2SuWVGNKmaYQGA/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            Lataa kuvat 
                        </a> | <a href="https://github.com/baobabKoodaa/gatsby-starter-photo-book" target="_blank" rel="noopener noreferrer">
                            Sivun lähdekoodi
                        </a> | <span onClick={this.toggle.bind(this)} style={{ cursor: "pointer" }}>
                            Kameran takana
                        </span>
                    </p>
                    <p style={{ maxWidth: "400px", color: "black", display: this.state.showMoreText ? "block" : "none" }}>
                        <a href="https://www.hannutiainenphotography.com/" target="_blank" rel="noopener noreferrer">
                            Hannu Tiainen
                        </a> oli mahtava valokuvaajamme. Osa sivulla näkyvistä kuvista on myös ihanien vieraidemme ottamia. Jos mietit yksittäisen kuvan alkuperää, saat joitakin tietoja pitämällä hiirtä suurikokoisen kuvan päällä.
                    </p>
                </center>
                <br/>
            </footer>
        )
    }
}
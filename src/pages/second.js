import React from "react"

import Layout from "../components/layout"

const SecondPage = (props) => (
  <Layout>
    <center>
      <br/><br/>

      {props.location.state && props.location.state.img &&
        <img
          src={props.location.state.img}
          alt="Larger version"
          title="Image from Unsplash"
          style={{
            width: "80%",
            height: "auto"
          }}
        />
      }
      
    </center>
  </Layout>
)

export default SecondPage

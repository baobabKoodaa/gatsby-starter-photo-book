import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const ImagePageTemplate = (props) => (
  <Layout>
    {console.log(props.pageContext)}
    <Link to={`/images/${props.pageContext.nextId}`}>
      
      <img
        src={props.pageContext.image.l}
        alt=""
        title=""
        style={{
          padding: "0",
          display: "block",
          margin: "0 auto",
          maxHeight: "100vh",
          maxWidth: "100vw"
        }}
      />
    </Link>
  </Layout>
)

export default ImagePageTemplate

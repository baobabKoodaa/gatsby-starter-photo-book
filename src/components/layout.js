import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import 'typeface-open-sans/index.css'
import "./layout.css"

class Layout extends React.Component {

  render() {

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
              <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Wedding Photos</title>
              </Helmet>
              
                <div
                  style={{
                    margin: `0 auto`,
                    maxWidth: "100vw",
                    padding: `0px 0px 0px`,
                    paddingTop: 0,
                    paddingLeft: "2px",
                    paddingRight: "2px"
                  }}
                >
                  <main>{this.props.children}</main>
                </div>
              </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

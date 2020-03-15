import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Charts from "../components/charts"

const IndexPage = () => (
  <Layout>
    <SEO title="Open COVID-19" />
    <Charts />
  </Layout>
)

export default IndexPage

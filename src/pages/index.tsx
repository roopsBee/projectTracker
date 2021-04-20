import React from "react"
import { Typography, Box, Grid } from "@material-ui/core"

import SEO from "../components/layout/seo"

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <Box height="100%" clone>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography align="center" variant="h3" component="h1">
            <Box letterSpacing={4} fontWeight="bold" fontStyle="italic">
              Project Tracker
            </Box>
          </Typography>
        </Grid>
      </Box>
    </>
  )
}

export default IndexPage

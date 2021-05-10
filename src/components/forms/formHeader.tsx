import { Grid, Box, Typography } from "@material-ui/core"
import React from "react"

interface FormHeaderProps {
  title: string
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
  return (
    <>
      <Grid item xs={12}>
        <Box pt={1}>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </Box>
      </Grid>
    </>
  )
}

export default FormHeader

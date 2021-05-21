import { Button } from "@material-ui/core"
import React from "react"

interface Props {
  text?: string
  disabled: boolean
}

const SubmitButton: React.FC<Props> = ({ text, disabled }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        type="submit"
      >
        {text ? text : "Submit"}
      </Button>
    </>
  )
}

export default SubmitButton

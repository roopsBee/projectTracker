import { Button, ButtonProps } from "@material-ui/core"
import React from "react"

type Props = ButtonProps & {
  text?: string
  disabled: boolean
}

const SubmitButton: React.FC<Props> = ({ text, disabled, ...props }) => {
  return (
    <>
      <Button
        {...props}
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

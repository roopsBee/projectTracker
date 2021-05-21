import { Button } from "@material-ui/core"
import React from "react"

interface Props {
  disabled: boolean
  onClick: () => void
  text?: string
}

const CancelButton: React.FC<Props> = ({ disabled, onClick, text }) => {
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        disabled={disabled}
        onClick={onClick}
      >
        {text ? text : "Cancel"}
      </Button>
    </>
  )
}

export default CancelButton

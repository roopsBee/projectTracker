import { Button } from "@material-ui/core"
import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
  color?: string
  style?: React.CSSProperties
}

const IconButton: React.FC<Props> = ({
  onClick,
  icon,
  style,
  color,
  ...props
}) => {
  return (
    <Button
      style={{
        borderRadius: "5px",
        width: "39px",
        height: "39px",
        minWidth: 0,
        border: "1px solid black",
        backgroundColor: color,
        ...style,
      }}
      onClick={onClick}
      variant="contained"
      {...props}
    >
      {icon}
    </Button>
  )
}

export default IconButton

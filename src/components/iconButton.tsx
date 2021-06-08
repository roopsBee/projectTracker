import { Button, makeStyles } from "@material-ui/core"
import React from "react"
import tinycolor from "tinycolor2"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
  color: string
}

type StyleProps = {
  color: string
  darkColor: string
  iconColor: string
}

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    width: "39px",
    height: "39px",
    minWidth: 0,
    border: "1px solid black",
    color: ({ iconColor }: StyleProps) => iconColor,
    backgroundColor: ({ color }: StyleProps) => color,
    "&:hover": {
      backgroundColor: ({ darkColor }: StyleProps) => darkColor,
    },
  },
})

const IconButton: React.FC<Props> = ({
  onClick,
  icon,
  color: tColor,
  ...props
}) => {
  const newColor = tinycolor(tColor)

  const color = newColor.toString()
  const darkColor = newColor.darken(15).toString()
  const iconColor = tinycolor
    .mostReadable(color, ["black", "white"])
    .toHexString()

  const classes = useStyles({ color, darkColor, iconColor })
  return (
    <Button
      className={classes.root}
      onClick={onClick}
      variant="contained"
      {...props}
    >
      {icon}
    </Button>
  )
}

export default IconButton

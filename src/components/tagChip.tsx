import { Chip, ChipProps } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { useEffect, useState } from "react"
import tinycolor from "tinycolor2"
import { motion } from "framer-motion"

import { ProjectTag } from "../redux/projectSlice/projectSlice"

type Props = ChipProps & {
  tag: ProjectTag
}

type StyleProps = {
  tagColor: string
  textColor: string
  borderColor: string
}

const useStyles = makeStyles({
  root: {
    backgroundColor: ({ tagColor }: StyleProps) => tagColor,
    border: ({ borderColor }: StyleProps) => `2px solid ${borderColor}`,
    color: ({ textColor }: StyleProps) => textColor,
  },
})

const tagChip: React.FC<Props> = ({ tag: { tagColor, tagName }, ...props }) => {
  const [borderColor, setborderColor] = useState("")
  const [textColor, setTextColor] = useState("")

  useEffect(() => {
    const newColor = tinycolor(tagColor)
    setborderColor(newColor.darken(20).toString())
    setTextColor(
      tinycolor.mostReadable(tagColor, ["black", "white"]).toHexString()
    )
  }, [tagColor])

  const classes = useStyles({ tagColor, borderColor, textColor })

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layout
      >
        <Chip
          {...props}
          className={classes.root}
          size="small"
          label={tagName}
        />
      </motion.div>
    </>
  )
}

export default tagChip

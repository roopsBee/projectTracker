import { Chip, ChipProps } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import tinycolor from "tinycolor2"
import { AnimatePresence, motion } from "framer-motion"

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
  const newColor = tinycolor(tagColor)
  const borderColor = newColor.darken(20).toString()
  const textColor = tinycolor
    .mostReadable(tagColor, ["black", "white"])
    .toHexString()

  const classes = useStyles({ tagColor, borderColor, textColor })

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Chip
            {...props}
            className={classes.root}
            size="small"
            label={tagName}
          />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default tagChip

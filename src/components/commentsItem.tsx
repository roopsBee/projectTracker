/** @jsx jsx */
import { jsx } from "@emotion/react"
import { ListItem, Typography, Grid } from "@material-ui/core"
import React from "react"
import { CommentType } from "../redux/projectSlice/projectSlice"
import { motion } from "framer-motion"

interface Props {
  comments: CommentType[]
}

const CommentsItem: React.FC<Props> = ({ comments }) => {
  const isComment = comments && comments[comments.length - 1]

  return (
    <>
      <motion.div
        layout
        initial={{ height: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        exit={{ height: 0 }}
        animate={{ height: "initial" }}
        style={{ overflow: "hidden" }}
      >
        <ListItem style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption" css={{ fontStyle: "italic" }}>
                {isComment && isComment.created}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {isComment && isComment.text}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </motion.div>
    </>
  )
}

export default CommentsItem

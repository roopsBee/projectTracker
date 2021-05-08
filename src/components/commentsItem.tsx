/** @jsx jsx */
import { jsx } from "@emotion/react"
import { ListItem, Typography, Grid } from "@material-ui/core"
import React from "react"
import { CommentType } from "../redux/projectSlice/projectSlice"

interface Props {
  comments: CommentType[]
}

const CommentsItem: React.FC<Props> = ({ comments }) => {
  const isComment = comments && comments[comments.length - 1]

  return (
    <>
      <ListItem css={{ marginBottom: 0, paddingTop: 0 }}>
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
    </>
  )
}

export default CommentsItem

/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  Container,
  Divider,
  List,
  ListItem,
  Typography,
  Grid,
} from "@material-ui/core"
import React from "react"
import { CommentType } from "../redux/projectSlice/projectSlice"
import CreateCommentForm from "./forms/createCommentForm"

interface Props {
  comments: CommentType[]
  taskId: string
  taskName: string
  closePopover: () => void
}

const CommentsPopover: React.FC<Props> = ({
  comments,
  taskId,
  taskName,
  closePopover,
}) => {
  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h5" css={{ paddingTop: 8 }}>
        {`${taskName} : Comments`}
      </Typography>
      <List>
        {comments.map((comment, i) => (
          <>
            <Divider />
            <ListItem key={i} css={{ margin: 0 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption" css={{ fontStyle: "italic" }}>
                    {comment.created}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{comment.text}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </>
        ))}
      </List>
      <CreateCommentForm taskId={taskId} closePopover={closePopover} />
    </Container>
  )
}

export default CommentsPopover

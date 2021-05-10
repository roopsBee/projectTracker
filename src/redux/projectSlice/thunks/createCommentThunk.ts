import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { CommentType } from "../projectSlice"
import dayjs from "dayjs"

type CommentCreateReturnType = {
  taskId: string
}

const createComment = createAsyncThunk<
  { taskId: string; comment: CommentType; projectId: string },
  { taskId: string; commentText: string; projectId: string },
  { state: RootState }
>(
  "project/createComment",
  async ({ taskId, commentText, projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const created = dayjs().format("DD/MM/YYYY HH:mm:ssa")

      const comment = { text: commentText, created }
      console.log(comment)

      const data: CommentCreateReturnType = await client.query(
        q.Call("commentCreate", [taskId, comment, userId])
      )

      return { ...data, comment, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createComment

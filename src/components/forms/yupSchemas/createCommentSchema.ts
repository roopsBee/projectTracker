import * as Yup from "yup"

const createCommentSchema = Yup.object().shape({
  text: Yup.string().required("Comment required").max(1000, "Text is too long"),
})

export default createCommentSchema

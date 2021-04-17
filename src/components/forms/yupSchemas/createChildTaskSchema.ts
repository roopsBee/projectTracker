import * as Yup from "yup"

const createChildTaskSchema = Yup.object().shape({
  childTaskName: Yup.string().required("Required").max(50, "Name is too long"),
})

export default createChildTaskSchema

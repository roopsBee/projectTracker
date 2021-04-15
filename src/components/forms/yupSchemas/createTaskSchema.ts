import * as Yup from "yup"

const createTaskSchema = Yup.object().shape({
  taskName: Yup.string().required("Required").max(50, "Name is too long"),
})

export default createTaskSchema

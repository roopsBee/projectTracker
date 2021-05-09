import * as Yup from "yup"

const taskNameChangeSchema = Yup.object().shape({
  taskName: Yup.string().required("Required").max(50, "Name is too long"),
})

export default taskNameChangeSchema

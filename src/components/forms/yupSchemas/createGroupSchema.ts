import * as Yup from "yup"

const createGroupSchema = Yup.object().shape({
  taskGroupName: Yup.string().required("Required").max(50, "Name is too long"),
})

export default createGroupSchema

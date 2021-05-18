import * as Yup from "yup"

const changeProjectNameSchema = Yup.object().shape({
  projectName: Yup.string().required("Required").max(30, "Name is too long"),
})

export default changeProjectNameSchema

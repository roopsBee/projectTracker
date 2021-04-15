import * as Yup from "yup"

const createProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Required").max(50, "Nameis too long"),
})

export default createProjectSchema

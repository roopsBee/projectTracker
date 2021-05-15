import { ProjectState } from "./projectSlice/projectSlice"

export default (state: ProjectState, log: any) => {
  state.isLoading = false
  console.log("rejected", log)
}

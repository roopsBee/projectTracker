import { ProjectState } from "./projectSlice/projectSlice"

export default (state: ProjectState, logText: string) => {
  state.isLoading = true
  console.log({ logText })
}

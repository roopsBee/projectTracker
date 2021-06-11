import { RootState } from "./store"

export const saveState = (state: RootState) => {
  try {
    const serialState = JSON.stringify(state)
    localStorage.setItem("appState", serialState)
  } catch (err) {
    console.log(err)
  }
}

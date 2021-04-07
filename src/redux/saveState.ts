export const saveState = (state: {}) => {
  try {
    const serialState = JSON.stringify(state)
    localStorage.setItem("appState", serialState)
    console.log("state saved")
  } catch (err) {
    console.log(err)
  }
}

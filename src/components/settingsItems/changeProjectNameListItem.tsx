/** @jsx jsx */
import { jsx } from "@emotion/react"
import { Divider } from "@material-ui/core"
import React from "react"
import ChangeProjectNameForm from "../forms/changeProjectNameForm"

// interface Props {}

const ChangeProjectNameListItem: React.FC = () => {
  return (
    <>
      <div css={{ padding: "0px 36px" }}>
        <ChangeProjectNameForm />
      </div>
      <Divider />
    </>
  )
}

export default ChangeProjectNameListItem

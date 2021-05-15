import React from "react"

interface Props {
  projectId: string
}

const ProjectSettingsPage: React.FC<Props> = ({ projectId }) => {
  return <>Settings: {projectId}</>
}

export default ProjectSettingsPage

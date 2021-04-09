import React from "react"
import { useAppSelector } from "../../redux/reduxHooks"

interface Props {
  projectId: string
}
const ProjectPage: React.FC<Props> = ({ projectId }) => {
  const project = useAppSelector(state =>
    state.projectState?.projects?.find(
      project => project.projectId === projectId
    )
  )

  return (
    <div>
      {`props projectId:${projectId} 
        
        found id: ${project?.projectId}

        found name: ${project?.projectName}
      `}
    </div>
  )
}

export default ProjectPage

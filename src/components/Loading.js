import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loading = ({loading}) => {
  return (
    <div className="loading-container">
      <BeatLoader
        size={18}
        margin={2}
        color={"#0366d6"}
        loading={loading}
      />
    </div>
  )
}

export default Loading
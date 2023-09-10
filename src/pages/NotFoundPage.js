import React, { useEffect } from 'react'

const NotFoundPage = () => {
  useEffect(() => {
    document.title = `WikiWise | Page Not Found`;
  }, []);
  
  return (
    <div>NotFoundPage</div>
  )
}

export default NotFoundPage
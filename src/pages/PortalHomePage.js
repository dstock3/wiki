import React, { useEffect } from 'react'

const PortalHomePage = () => {
  useEffect(() => {
    document.title = `WikiWise | Portal Home`;
  }, []);

  return (
    <div>PortalHomePage</div>
  )
}

export default PortalHomePage
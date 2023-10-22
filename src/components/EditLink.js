import React from 'react'
import { Link } from 'react-router-dom'

const EditLink = ({linkTo, linkClass}) => {
  return (
    <span>[<Link to={linkTo} className={linkClass}>Edit</Link>]</span>
  )
}

export default EditLink
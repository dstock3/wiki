import React from 'react'
import '../styles/InfoBox.css'

const InfoBox = ({title, image, info}) => {
  return (
    <table className="infobox">
        <caption className="infobox-title">{title}</caption>
        <tbody>
            {image && ( 
                <tr>
                    <td colSpan="2" className="infobox-image">
                        <span className="img-default-size">
                            <img alt={image.alt} src={image.src} />
                        </span>
                    </td>
                </tr>
            )}
            {info && info.map((item, index) => (
                <tr key={index}>
                    <th className={item.header ? "infobox-header" : "infobox-label"}>
                        {item.label}
                    </th>
                    <td className="infobox-value">{item.value}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default InfoBox
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
                item.header ? (
                    <tr key={index}>
                        <th colSpan="2" className="infobox-header">
                            {item.label}
                        </th>
                    </tr>
                ) : (
                    <tr key={index}>
                        <th className="infobox-label">{item.label}</th>
                        {item.value ? (
                            <td className="infobox-value">{item.value}</td>
                        ) : null}
                    </tr>
                )
            ))}
        </tbody>
    </table>
  )
}

export default InfoBox;

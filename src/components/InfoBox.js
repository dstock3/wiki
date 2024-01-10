import React from 'react'
import '../styles/InfoBox.css'

const InfoBox = ({title, image, info, category}) => {
    const categoryClass = category ? `infobox-category-${category}` : '';

    return (
        <table className="infobox">
            <tbody>
                <tr>
                    <th colSpan="2">
                        <div className={`infobox-title ${categoryClass}`}>{title}</div>
                    </th>
                </tr>
                
                {image && ( 
                    <tr>
                        <td colSpan="2" className="infobox-image">
                            <span className="img-default-size">
                                <img src={image.src} alt={image.alt} />
                            </span>
                            <div className="infobox-caption">{image.alt}</div>
                        </td>
                    </tr>
                )}
                {info && info.map((item, index) => (
                    item.header ? (
                        <tr key={index}>
                            <th colSpan="2" className={`infobox-header ${categoryClass}`}>
                                {item.label}
                            </th>
                        </tr>
                    ) : (
                        <tr key={index}>
                            <th colSpan="1" className="infobox-label">{item.label}</th>
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

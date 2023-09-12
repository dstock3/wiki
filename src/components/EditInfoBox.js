import React from 'react'

const EditInfoBox = ({infobox, handleInfoboxChange, handleInfoboxImageUpload, handleInfoboxImageChange, handleInfoboxInfoChange, addInfoField}) => {
  return (
    <div className="infobox-editor">
        <h3>Infobox</h3>
        <div className="info-field-container">
            <label>Infobox Title:</label>
            <input 
                type="text" 
                placeholder="Infobox Title" 
                value={infobox.title}
                onChange={(e) => handleInfoboxChange('title', e.target.value)} 
            />
        </div>
        <div className="info-field-container">
            <label>Upload Image:
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleInfoboxImageUpload} 
                />
            </label>
        </div>
        <div className="info-field-container">
            <label>Image Description: </label>
            <input 
                type="text" 
                placeholder="Image Alt Text" 
                value={infobox.image.alt}
                onChange={(e) => handleInfoboxImageChange('alt', e.target.value)} 
            />
        </div>
        <div className="label-value-pairs">
            {infobox.info.map((infoField, index) => (
                <div key={index} className="label-value-pair">
                    <div className="info-field-container">
                        <label>Info Field {index + 1}:</label>
                        <input 
                            type="text" 
                            placeholder="Label" 
                            value={infoField.label}
                            onChange={(e) => handleInfoboxInfoChange(index, 'label', e.target.value)} 
                        />
                    </div>
                    {
                        infoField.header ? (
                            <span>Header</span>
                        ) : (
                            <div className="info-field-container">
                                <label>Value:</label>
                                <input 
                                    type="text" 
                                    placeholder="Value" 
                                    value={infoField.value}
                                    onChange={(e) => handleInfoboxInfoChange(index, 'value', e.target.value)} 
                                />
                            </div>
                        )
                    }
                    <div className="info-checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={infoField.header || false}
                            onChange={(e) => handleInfoboxInfoChange(index, 'header', e.target.checked)}
                        /> <span>Mark as Header</span>
                    </div>
                </div>
            ))}
            <button className="add-infofield-button" onClick={addInfoField}>+</button>
        </div>  
    </div>
  )
}

export default EditInfoBox
import React from 'react'

function Button({
    handleButton,
    children,
    divclassName='',
    className='',
    ...props

}) {
return (
    <div className={`${divclassName}`}>
        <button onClick={handleButton} className={`${className}`} {...props}>{children}</button>
    </div>
)
}

export default Button

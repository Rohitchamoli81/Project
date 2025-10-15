import React from 'react'

function CardBtn({
    children,
    Submit,
    className,
    ...props
}) {
  return (
    <div>
        <button className={`${className}`} onClick={Submit} {...props}>{children}</button>
    </div>
  )
}

export default CardBtn

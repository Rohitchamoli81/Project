import React from 'react'

function Card({
    Icon,  // Pass the icon component
    heading,
    content,
    textColor,
    ...props
}) {
    return (
        <div className={`flex flex-col bg-stone-400 rounded-lg p-6 w-36 justify-center items-center
            hover:text-orange-400 text-center ${textColor}  shadow-lg hover:shadow-xl transition-shadow`} {...props}>
            {Icon && <Icon className='w-12 h-12 mb-3 ' />}
            <h3 className='font-bold text-lg mb-1'>{heading}</h3>
            <span className='text-sm'>{content}</span>
        </div>
    )
}

export default Card
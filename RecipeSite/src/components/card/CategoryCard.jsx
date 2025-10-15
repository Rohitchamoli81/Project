import React from 'react'

function CategoryCard({meal,
    ...props
}) {
return (
<div className='w-auto py-4 gap-3 h-auto flex cursor-pointer '>
    <div>
        <img className='w-20 h-25 rounded-sm' src={meal.thumbnail} alt="meal" {...props} />
    </div>
    <div>
        <div className='font-semibold text-red-400'>{meal.category}</div>
        <div className='font-semibold w-50 '>{meal.name}</div>
    </div>
</div>
)
}

export default CategoryCard

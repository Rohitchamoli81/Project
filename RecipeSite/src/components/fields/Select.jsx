import React ,{useId} from 'react'

function Select({
    options,
    className='',
    label,
    ...props
},ref) {

    const id = useId()

return (
<div className='w-full'>
    {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
    <select
    id={id}
    {...props}
    className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200
    border-gray-200 w-full  ${className}`}
    ref={ref}>
        {options?.map((option)=>
        <option key={option.value} value={option.value}>{option.label}</option>
        )}
    </select>
</div>
)
}

export default React.forwardRef(Select)

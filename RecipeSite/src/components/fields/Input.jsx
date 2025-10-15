import React ,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    name,
    placeholder,
    className = '',
    ...props
}, ref) {

    const id = useId()

return (
    <div className={`w-full `} >
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
        <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200
        border-gray-200 w-full ${className}`}
        {...props}
        />
    </div>
    )
})

export default Input

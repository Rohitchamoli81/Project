import { Editor  } from 'tinymce';
import { Controller } from 'react-hook-form';


function RTE({
    name,
    control,
    defaultValue ='',
    label,
}) {
return (
    <div className='w-full'>
        {
            label && <p className='text-gray-700 mb-2 font-semibold'>{label}</p>
        }
        <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field:{onChange}})=>(
            <Editor
            apiKey="qxdjc8m7ba5z6734mdng7ujrvzp9ll0oxvf591kcdb1o563d"
            initialValue={defaultValue}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }", }}
            onEditorChange={onChange}
            /> 
        )}
        />
    </div>
)
}

export default RTE



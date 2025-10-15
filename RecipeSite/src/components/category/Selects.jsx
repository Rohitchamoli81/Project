import React,{useState} from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

function Selects({cat}) {
  const[value , setvalue] = useState(cat);
  const navigate = useNavigate();
  return (
    <div className='stroke-neutral-400'>
    <Select 
    showSearch
    defaultValue={value}
    onChange={(val)=>setvalue(val)}
    onClick={()=>navigate(`/recipes/${decodeURIComponent(value)}`)}
    style={{ width: 210 }}
    placeholder="Search to Select"
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'East Asian',
        label: 'East Asian',
      },
      {
        value: 'South Asian',
        label: 'South Asian',
      },
      {
        value: 'Western European',
        label: 'Western European',
      },
      {
        value: 'Northern Europea',
        label: 'Northern Europea',
      },
      {
        value: 'Americas',
        label: 'Americas',
      },
      {
        value: 'Africa & Middle East',
        label: 'Africa & Middle East',
      },
    ]}
  />
  </div>
  )
}


export default Selects;
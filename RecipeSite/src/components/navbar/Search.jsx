import React, { useState } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
const Search = () => {
  const recipes = useSelector((state=> state.meals.meals))
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const options = recipes.map((recipe) => ({
    value: recipe.id,
    label: recipe.name,
    category: recipe.category,
    area: recipe.area,
  }));
  return (
    <Select className='bg-stone-400'
      showSearch
      value={value}
      placeholder="Search Recipes"
      style={{ width: 200}}
      options={options}
      onSelect={(value) => {
        setValue(value);
        navigate(`/detail/${value}`)
        setTimeout(() => setValue(''), 1000);
      }}
      filterOption={(input, option) =>
      (option.label.toLowerCase().includes(input.toLowerCase()))||
      (option.category.toLowerCase().includes(input.toLowerCase()))||
      (option.area.toLowerCase().includes(input.toLowerCase()))
      }
    />
  );
};
export default Search;
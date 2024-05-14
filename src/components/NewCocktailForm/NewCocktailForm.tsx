import React, { useState } from 'react';

import s from './NewCocktailForm.module.scss'
import { postData } from '../../api/api-utils';
import { NODE_URL } from '../../api/config';


const NewCocktailForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.name || !formData.ingredients || !formData.instructions || !formData.image) {
      alert('Please fill in all fields.');
    } else {
      postData(`${NODE_URL}/drinks`, formData)

    }

  };

  return (
    <div className={s.form}>
      <h2>Add New Drink</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input className={s.input} type="text" required name="name" placeholder='A. J.' value={formData.name} onChange={handleChange} />
        <label>Ingredients:</label>
        <textarea className={s.textarea} name="ingredients" required placeholder='1)Ingredient 2)Ingredient' value={formData.ingredients} onChange={handleChange} />
        <label>Instructions:</label>
        <textarea className={s.textarea} name="instructions" required placeholder='1) Instruction 2)Instruction' value={formData.instructions} onChange={handleChange} />
        <label>Image:</label>
        <input className={s.input} type="url" name="image" placeholder='https://www.www' value={formData.image} onChange={handleChange} />
        <button className={s.button} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewCocktailForm;

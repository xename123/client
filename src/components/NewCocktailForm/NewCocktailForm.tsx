import React, { useState } from 'react';

import s from './NewCocktailForm.module.scss'
import { postData } from '../../api/api-utils';
import { NODE_URL } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../Snackbar/Snackbar';


const NewCocktailForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
  });
  const [message, setMessage] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const navigation = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setMessage('Please fill in all fields.');
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
      }, 1300)
    } else {
      postData(`${NODE_URL}/drinks`, { ...formData, ingredients: formData.ingredients.split(',') })
      setMessage('Added new Coctail')
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
        navigation('/')
      }, 1300)

    }

  };

  return (
    <div className={s.form}>
      <h2>Add New Drink</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input className={s.input} type="text" required name="name" placeholder='A. J.' value={formData.name} onChange={handleChange} />
        <label>Ingredients:</label>
        <textarea className={s.textarea} name="ingredients" required placeholder='Specify ingredients separated by commas' value={formData.ingredients} onChange={handleChange} />
        <label>Instructions:</label>
        <textarea className={s.textarea} name="instructions" required placeholder='1) Instruction 2)Instruction' value={formData.instructions} onChange={handleChange} />
        <label>Image:</label>
        <input className={s.input} type="url" name="image" placeholder='https://www.www' value={formData.image} onChange={handleChange} />
        <button className={s.button} type="submit">Submit</button>
      </form>
      {showSnackbar && <Snackbar message={message} />}
    </div>
  );
};

export default NewCocktailForm;

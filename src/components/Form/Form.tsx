import React, { useState } from 'react';
import { NODE_URL } from '../../api/config';
import s from "./RegistrationForm.module.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

    const handleRegistration = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${NODE_URL}/auth/register`, { username, email, password });
            navigate('/login')
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Error during registration. Please try again.');
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form className={s.form} onSubmit={handleRegistration}>
                <input className={s.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className={s.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className={s.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className={s.button} type="submit">Register</button>
            </form>



            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default RegistrationForm;

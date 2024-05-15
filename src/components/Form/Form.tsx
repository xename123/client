import React, { useState } from 'react';
import { NODE_URL } from '../../api/config';
import s from "./RegistrationForm.module.scss";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setJWT } from '../../api/api-utils';
import Snackbar from '../Snackbar/Snackbar';

interface RegistrationFormnProps {
    setUser: Function;
}


const RegistrationForm: React.FC<RegistrationFormnProps> = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false)


    let navigate = useNavigate();

    const handleRegistration = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${NODE_URL}/auth/register`, { username, email, password });
            if (response.status === 200) {
                setMessage("Regist is success")
                setShowSnackbar(true)
                const response = await axios.post(`${NODE_URL}/auth/login`, {
                    email,
                    password,
                });
                setTimeout(() => {
                    setShowSnackbar(false)
                    setUser({ username, email })
                    navigate('/')
                }, 1300)
                setJWT(response.data.token);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Error during registration. Please try again.');
            setShowSnackbar(true)
            setTimeout(() => {
                setShowSnackbar(false)
            }, 1300)
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form className={s.form} onSubmit={handleRegistration}>
                <input className={s.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className={s.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className={s.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className={s.button} type="submit">Register</button>
            </form>
            <Link className={s.button} to="/">Login</Link>

            {showSnackbar && <Snackbar message={message} />}
        </div>
    );
};

export default RegistrationForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                repPassword,
                firstName,
                lastName,
                age,
            }),
            });

            const data = await response.json();

            if (!data.success) {
                setErrors(data.errors || {});
            } else {
                alert('Signup successful');
                navigate('/login');
            }
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

 
    return (
        <div className="login-page">
            <h1 id="login-page-h1">Sign Up</h1>

            <input
                className="search-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}

            <input
                className="search-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
                className="search-input"
                placeholder="Repeat password"
                type="password"
                value={repPassword}
                onChange={(e) => setRepPassword(e.target.value)}
            />
            {errors.repPassword && <p className="error-text">{errors.repPassword}</p>}

            <input
                className="search-input"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}

            <input
                className="search-input"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}


            <input
                className="search-input"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="error-text">{errors.age}</p>}


            <button className="search-button" onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
};

export { SignUp };

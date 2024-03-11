import { Icon } from '@iconify/react';
import TextInput from '../components/TextInput';
import Password from '../components/Password';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='FullWindow bg-white flex items-center flex-col justify-center'>
                <div className='logo p-5 py-7 bg-white '>
                    <a href='/home'><Icon icon="logos:spotify" width="150" /></a>
                </div>
                <div className='pt-4 text-black text-2xl font-bold'>
                    Sign up for free to start listening.
                </div>
                <div className='text-black w-10/12'>
                    <TextInput label="Email" placeholder="Email" color="bg-white" value={email} setvalue={setEmail} />
                    <TextInput label="First Name" placeholder="First Name" color="bg-white" value={firstname} setvalue={setFirstname} />
                    <TextInput label="Last Name" placeholder="Last Name" color="bg-white" value={lastname} setvalue={setLastname} />
                    <TextInput label="Username" placeholder="Username" color="bg-white" value={username} setvalue={setUsername} />
                    <Password label="Password" placeholder="Password" color="bg-white" value={password} setvalue={setPassword} />
                    <div className='w-full my-8'>
                        <button className='w-full butt font-semibold p-3 px-10 rounded-full' onClick={async () => {
                            try {
                                const data = { email, password, firstname, lastname, username };
                                const resp = await axios.post("https://sonags-backend.onrender.com/register", data);
                                localStorage.setItem("token", resp.data);
                                setToken(resp.data);
                                navigate("/home");
                            } catch (e) {
                                alert('Error');
                            }
                        }}>
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className='w-full border border-solid border-gray-300'></div>
                <div className='text-xl py-7 text-black'>
                    Have an account? <a href="/login" className="text-black hover:text-green-500 cursor-pointer">Login</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

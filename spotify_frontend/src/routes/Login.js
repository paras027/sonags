import { Icon } from '@iconify/react';
import TextInput from "../components/TextInput";
import Password from "../components/Password";
import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex flex-col items-center bg-gradient-to-b from-zinc-900 to-black'>
            <div className='logo p-5 py-7  w-full flex justify-start bg-black '>
                <a href='/home'>
                    <Icon icon="logos:spotify" width="150" />
                </a>
            </div>
            <div className='w-full p-8 flex items-center justify-center flex-col'>
                <div className='w-full p-5 inputRegion flex items-center justify-center flex-col bg-black  rounded-lg'>
                    <h1 className="font-bold mt-12 mb-12 text-white text-2xl md:text-5xl my-8 ">Log in to Spotify</h1>
                    <div className='  text-white'>
                        <TextInput label="Email ID or Username" placeholder="Email ID or Username" color="bg-black" value={email} setvalue={setEmail} />
                        <Password label="Password" placeholder="Password" color="bg-black" value={password} setvalue={setPassword} />
                        <div className='w-full my-8'>
                            <button className='w-full butt font-semibold p-3 px-10 rounded-full' onClick={async function () {
                                try {
                                    console.log("Login");
                                    const data = { email, password };
                                    const resp = await axios.post("https://sonags-backend.onrender.com/login", data);
                                    localStorage.setItem("token", resp.data);
                                    setToken(resp.data);
                                    navigate("/home");
                                    console.log("Login done");
                                } catch (e) {
                                    alert('Error');
                                }
                            }}>
                                LOG IN
                            </button>
                        </div>
                        <div className='w-full border border-solid border-gray-300'></div>
                        <div className=' px py-7 '>Don't have an account? <a href="/signup" className="text-white hover:text-green-500 cursor-pointer">  Sign up for Spotify</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

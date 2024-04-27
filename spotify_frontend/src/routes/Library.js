import { Icon } from '@iconify/react';
import SideTexts from '../components/SideTexts';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop,faHouse,faBook, faPlay, faHeart, faShieldHeart } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Home.css';

const Library = ({ setToken }) => {
    const token = localStorage.getItem('token');
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    const handleLogoutButton = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate("/login");
    }

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://sonags-backend.onrender.com/getlikedsongs', {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response);
            const fetchedSongs = response.data.datagot.values;
            setSongs(fetchedSongs);
        }
        fetchData();
    }, [token]);

    return (
        <div className='bg-black flex'>
        <div className="  flex flex-col justify-between h-screen ww mm w-screen md:w-1/5 lg:w-1/6 ">
        <div className='flex flex-col space-y-8'>
        <div className=' sm:ml-5 flex space-x-2 md:text-xl mt-8'>
        <div className='text-green-500 sm:text-5xl text-2xl font-bold'>MusicPlay</div>
                    <div className='text-gray-400 hidden md:block mt-2 ' class>MusicPlay</div>
        </div>
        <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 cursor-pointer' onClick={function(){
            navigate('/home')
        }}>
        <div className='text-gray-500 sm:text-4xl hover:text-white'><FontAwesomeIcon icon={faHouse} /></div>
        <div className=' text-gray-400 hidden md:block pt-2'> Home </div>
        </div>
        <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 cursor-pointer' onClick={function(){
            navigate('/library')
        }}>
        <div className='text-gray-500 sm:text-4xl hover:text-white'><FontAwesomeIcon icon={faBook} /></div>
        <div className=' text-gray-400 hidden md:block pt-2'> Library </div>
        </div>
        <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 cursor-pointer' onClick={function(){
            navigate('/likedsongs')
        }}>
        <div className='text-gray-500 sm:text-4xl hover:text-white'><FontAwesomeIcon icon={faShieldHeart} /></div>
        <div className=' text-gray-400 hidden md:block '> Liked Songs </div>
        </div>
            
        </div>
        <div className='px-5 pb-5 hidden md:block'>
            <div className='border border-gray-300 text-white w-full flex px-2 py-1 rounded-full items-center justify-center'>
                <Icon icon="carbon:earth-europe-africa" />
                <div className='ml-2'>English</div>
            </div>
        </div>
    </div>
    
    {/* Right Content Area */}
            <div className="h-full w-full bg-gradient-to-b from-zinc-900 to-black">
                <div className='bg-black bg-opacity-30 w-full flex items-center justify-end px-5 py-7'>
                    {/* Any content you want to add */}
                </div>
                <div className="h-full w-full bg-gradient-to-b from-zinc-900 to-black overflow-auto">
                    <div className="content p-8 pt-0 overflow-auto">
                        <PlaylistView cardsData={songs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlaylistView = ({ cardsData }) => {
    return (
        <div className="text-white mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cardsData.map((item) => (
                    <Card
                        key={item.id} // Ensure each card has a unique key
                        title={item.songname}
                        description={item.likes}
                        imgUrl={item.thumbnail}
                        songplay={item.link}
                    />
                ))}
            </div>
        </div>
    );
};

const Card = ({ title, description, imgUrl, songplay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-black bg-opacity-40 p-4 rounded-lg card">
            <div className="overflow-hidden">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
                <div className="text-white font-semibold py-3">{title}</div>
                <div className="text-gray-500 text-sm mt-2">{(description / 60000).toFixed(2)}</div>
                <div className="flex justify-between h-20 mt-3">
                    <div className='rounded justify-end h-fit cursor-pointer' onClick={handlePlayPause}>
                        {isPlaying ? (<FontAwesomeIcon icon={faStop} size="2x" style={{ color: "#37C314" }} />) : <FontAwesomeIcon icon={faPlay} size="2x" style={{ color: "#37C314" }} />}
                    </div>
                </div>
                <audio ref={audioRef} src={songplay} />
            </div>
        </div>
    );
};

export default Library;

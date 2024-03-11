import { Icon } from '@iconify/react';
import SideTexts from '../components/SideTexts';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

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
            const response = await axios.get('http://localhost:8000/getlikedsongs', {
                headers: {
                    'Authorization': token
                }
            });
            const fetchedSongs = response.data.datagot.values;
            setSongs(fetchedSongs);
        }
        fetchData();
    }, [token]);

    return (
        <div className="h-screen w-screen flex">
            <div className="bg-black flex flex-col justify-between h-full w-1/5 md:w-1/4 lg:w-1/6">
                <div>
                    <div className='logo px-5 py-7'>
                        <Icon icon="logos:spotify" width="150" />
                    </div>
                    <div>
                        <SideTexts icons="teenyicons:home-outline" nameicon="Home" path="/home" />
                        <SideTexts icons="ion:library-outline" nameicon="Library" path="/library" active />
                        <SideTexts icons="solar:chat-square-like-linear" nameicon="Liked Songs" path="/likedsongs" />
                    </div>
                </div>
                <div className='px-5 pb-5'>
                    <div className='border border-gray-300 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center'>
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className='ml-2'>English</div>
                    </div>
                    <div className='font-bold text-lg cursor-pointer text-gray-400 hover:text-white mt-5' onClick={handleLogoutButton}>
                        Logout
                    </div>
                </div>
            </div>
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

import { Icon } from '@iconify/react';
import SideTexts from '../components/SideTexts';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop,faHouse,faBook, faPlay, faHeart, faShieldHeart } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Home.css';

const Home = ({ setToken }) => {
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
            const res = await axios.post("https://accounts.spotify.com/api/token",
                "grant_type=client_credentials&client_id=3b13619ee4724051bd144d0cd7892932&client_secret=a9b2350c23af44c58ec9ef813eb6bb5f",
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            const accessToken = res.data.access_token;
            const trackName = 'salman';
            const artistName = 'salman';
            const queryString = `track:${trackName} artist:${artistName}`;
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: queryString,
                    type: 'track,artist',
                    limit: '40'
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(response);
            const fetchedSongs = response.data.tracks.items;
            setSongs(fetchedSongs);
        }
        fetchData();
    }, []);

    const path1 = '/home';
    const path2 = '/likedsongs';
    const path3 = '/library';
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className='bg-black flex'>
            {/* Left Sidebar */}
            
            <div className="  flex flex-col justify-between h-screen ww mm w-screen md:w-1/5 lg:w-1/6 ">
                <div className='flex flex-col space-y-8'>
                    <div className=' sm:ml-5 flex space-x-2 md:text-xl mt-8'>
                    <div className='text-green-500 sm:text-5xl'><FontAwesomeIcon icon={faSpotify} /></div>
                    <div className='text-gray-400 hidden md:block mt-2 ' class>Spotify</div>
                    </div>
                    <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 hover:text-white cursor-pointer' onClick={function(){
                        navigate('/home')
                    }}>
                    <div className='text-gray-500 sm:text-4xl '><FontAwesomeIcon icon={faHouse} /></div>
                    <div className=' text-gray-400 hidden md:block pt-2 '> Home </div>
                    </div>
                    <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 hover:text-white cursor-pointer' onClick={function(){
                        navigate('/library')
                    }}>
                    <div className='text-gray-500 sm:text-4xl '><FontAwesomeIcon icon={faBook} /></div>
                    <div className=' text-gray-400 hidden md:block pt-2 '> Library </div>
                    </div>
                    <div className='sm:ml-5 flex  space-x-2 md:text-xl mt-2 hover:text-white cursor-pointer' onClick={function(){
                        navigate('/likedsongs')
                    }}>
                    <div className='text-gray-500 sm:text-4xl '><FontAwesomeIcon icon={faShieldHeart} /></div>
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
            <div className="h-screen  w-screen bg-gradient-to-b from-zinc-900 to-black">
                <div className='hh bg-opacity-30 w-full bg-black flex items-center justify-end'>
                    <div className='w-1/3 flex h-full'>
                        <div className='w-3/5 flex justify-around items-center'></div>
                        <div className='w-2/5 flex justify-around h-full items-center'>
                            <div className='font-bold sm:mr-5 mf text-lg cursor-pointer text-gray-400 hover:text-white' onClick={handleLogoutButton}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full bg-gradient-to-b from-zinc-900 to-black overflow-scroll ">
                    <div className="flex ml-5">
                        <input type="text" placeholder="Name" className="mt-12 w-2/3 p-2 h-5/6 border-solid rounded" onChange={(e) => {
                            setValue(e.target.value)
                        }} />
                        <button className="cursor-pointer text-black mt-12 ml-5 bg-green-500 w-20 border-solid rounded font-semibold" onClick={async function () {
                            const res = await axios.post("https://accounts.spotify.com/api/token",
                                "grant_type=client_credentials&client_id=3b13619ee4724051bd144d0cd7892932&client_secret=a9b2350c23af44c58ec9ef813eb6bb5f",
                                {
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    }
                                }
                            )
                            const accessToken = res.data.access_token;
                            const trackName = value;
                            const artistName = value;
                            const queryString = `track:${trackName} artist:${artistName}`;
                            const vv = await axios.get('https://api.spotify.com/v1/search', {
                                params: {
                                    q: queryString,
                                    type: 'track,artist',
                                    limit: '40'
                                },
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            })
                            console.log(vv);
                            const fetchedSongs = vv.data.tracks.items;
                            setSongs(fetchedSongs);
                        }}>
                            search
                        </button>
                    </div>
                    <div className="content p-8 pt-0 ">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cardsData.map((item, index) => (
                    <Card key={index} title={item.name} description={item.duration_ms} imgUrl={item.album.images[0].url} songplay={item.preview_url} />
                ))}
            </div>
        </div>
    );
};

const Card = ({ title, description, imgUrl, songplay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [like, setLike] = useState(localStorage.getItem(title) === 'true');
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        localStorage.setItem(title, like);
    }, [like, title]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleStop = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    return (
        <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg card">
            <div className="overflow-hidden">
                <div className="pb-4 pt-2">
                    <img className="w-full rounded-md" src={imgUrl} alt="label" />
                </div>
                <div className="text-white font-semibold py-3">{title}</div>
            </div>
            <div className="text-gray-500 text-sm mt-2">{(description / 60000).toFixed(2)}</div>
            <div className='flex w-full justify-between h-20 mt-3'>
                <div className='justify-start ml-3 cursor-pointer' onClick={async function () { setLike(!like)

                    const res = await axios.put('https://sonags-backend.onrender.com/addsong', {
                        songname: title,
                        thumbnail: imgUrl,
                        likes: description,
                        link: songplay
                    },
                        {
                            headers: { 'Content-Type': 'application/json', 'Authorization': authToken }
                        });
                        console.log(res);
                }}>
                    {like ? (<FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: "#37C314" }} />) : (<FontAwesomeIcon icon={faHeart} size="2xl" />)}
                </div>
                <div className='rounded justify-end h-fit cursor-pointer' onClick={handlePlayPause}>
                    {isPlaying ? (<FontAwesomeIcon icon={faStop} size="2xl" style={{ color: "#37C314" }} />) : <FontAwesomeIcon icon={faPlay} size="2xl" style={{ color: "#37C314" }} />}
                </div>
            </div>
            <audio
                ref={audioRef}
                src={songplay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
};

export default Home;

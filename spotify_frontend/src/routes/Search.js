import { useEffect,useState } from "react";
import TextInput from "../components/TextInput";
import axios from 'axios';
import { Icon } from '@iconify/react';
import SideTexts from '../components/SideTexts';
import {useNavigate} from 'react-router-dom';


const Search = () => {
    const [value, setValue] = useState("");
    const [songs, setSongs] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        async function getdaa() {
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

// Concatenate track and artist names in the format expected by the Spotify API
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
            console.log(vv.data);
        const fetchedSongs = vv.data.tracks.items;
        console.log(fetchedSongs)
        // Set the songs data in state
        setSongs(fetchedSongs);
        }
        getdaa();
    },[]);
    return (
        <div className="h-screen w-screen flex ">
            <div className="damn bg-black flex flex-col justify-between  h-full">
                <div >
                    <div className='logo px-5 py-7'>
                        <Icon icon="logos:spotify" width="150" />
                    </div>
                    <div>
                    <div onClick={function(){
                        navigate('/home');
                    }}>
                        <SideTexts icons="teenyicons:home-outline" nameicon="Home" active  />
                        </div>
                        <SideTexts icons="tabler:search" nameicon="Search" />
                        <SideTexts icons="ion:library-outline" nameicon="library" />
                    </div>
                    <div className='pt-7'>
                        <SideTexts icons="gg:add-r" nameicon="Create Playlist" active />
                        <SideTexts icons="solar:chat-square-like-linear" nameicon="Liked Songs" />
                    </div>
                </div>
                <div className='px-5 pb-5'>
                    <div className='border border-gray-300 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center'>
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className='ml-2'>English</div>
                    </div>
                </div>
            </div>
            <div className=" h-full w-full bg-gradient-to-b from-zinc-900 to-black overflow-auto">
            <div className="flex ml-5">
                <input type="text" placeholder="Name" className="mt-12 w-2/3 p-2 h-5/6 border-solid rounded" onChange={(e) => {
                    setValue(e.target.value)
                }} />
                <button className="cursor-pointer text-black mt-12 ml-5 bg-green-500 w-20 border-solid rounded font-semibold"  onClick={async function(){
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

// Concatenate track and artist names in the format expected by the Spotify API
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
                    console.log(vv.data);
                const fetchedSongs = vv.data.tracks.items;
                console.log(fetchedSongs)
                // Set the songs data in state
                setSongs(fetchedSongs);
                }}>
                    search
                </button>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    <PlaylistView
                        cardsData={songs}
                    />
                </div>
            
            </div>
        </div>
    );
}

const PlaylistView = ({ cardsData }) => {
    return (
        <div className="text-white mt-8">
            <div className="grid grid-cols-5 ">
                {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.name}
                                description={item.duration_ms
                                }
                                imgUrl={item.album.images[0].url}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className="bg-black bg-opacity-40 w-5/6 p-4 rounded-lg card">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Search;
import { Icon } from '@iconify/react';
import SideTexts from '../components/SideTexts';
import { useState } from 'react';
import TextInput from '../components/TextInput';
import Cookies from 'js-cookie';
import axios from 'axios';

const AddSongs = () => {

    const [name, setname] = useState("");
    const [thumbnail, setthumbnail] = useState("");
    const [track, settrack] = useState("");

    const Added = async () => {
        try {
            const data = { name, thumbnail, track };
            const token = Cookies.get('token'); // Replace with the actual JWT token
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post("http://localhost:8000/song/create", data, {
                headers: headers,
            });
            if (response && !response.data.err) {

                alert("Success");
            } else {
                alert("Fail");
            }
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
            alert("Fail");
        }
    };

    return (
        <div className="h-screen w-screen flex ">
            <div className="damn bg-black flex flex-col justify-between  h-full">
                <div >
                    <div className='logo px-5 py-7'>
                        <Icon icon="logos:spotify" width="150" />
                    </div>
                    <div>
                        <SideTexts icons="teenyicons:home-outline" nameicon="Home" active />
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
            <div className='h-full w-full bg-gradient-to-b from-zinc-900 to-black overflow-auto' >
                <div className='h-2/5 w-2/5 m-5'>
                    <TextInput label="Name" placeholder="Name" color="bg-white" value={name} setvalue={setname} />
                    <TextInput label="Thumbnail" placeholder="Thumbnail" color="bg-white" value={thumbnail} setvalue={setthumbnail} />
                    <TextInput label="Track" placeholder="Track " color="bg-white" value={track} setvalue={settrack} />
                    <button className='w-full    butt font-semibold p-3 px-10 rounded-full' onClick={(e) => {
                        e.preventDefault();
                        Added();
                    }}>
                        Add Song
                    </button>
                </div>
                adadad</div>
        </div>
    );
}

export default AddSongs;
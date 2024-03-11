import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const SideTexts = ({ icons, nameicon, active, path }) => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center md:text-2xl text-gray-400 py-2 cursor-pointer hover:text-white text-base' onClick={() => navigate(path)}>
            <div className='mr-3'>
                <Icon icon={icons}  color={active ? "white" : "gray"} />
            </div>
            <div className='font-bold'>
                {nameicon}
            </div>
        </div>
    );
};

export default SideTexts;

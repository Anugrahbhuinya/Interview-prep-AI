import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/');
    };

    return user && (
        <div className="flex items-center">
            <img 
                src={user.profileImgUrl} 
                alt={`${user.name}'s profile`} 
                className="w-11 h-11 bg-gray-300 rounded-full mr-3" 
            />
            <div className="">
                <div className="text-[15px] text-black font-bold leading-3">
                    {user.name || ""}
                </div>
                <button
                    className="text-amber-600 text-sm font-semibold cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
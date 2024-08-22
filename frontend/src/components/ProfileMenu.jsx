import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        navigate("/");
        toast.success("Successfully Logout ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    return (
        <div className='absolute z-30 p-5 bg-white shadow-xl rounded-xl right-2 top-20'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <Link to="/profile">
                    <p className='cursor-pointer hover:text-secondary text-md'>Profile</p>
                </Link>
                <p onClick={handleLogout} className='cursor-pointer hover:text-secondary text-md'>Logout</p>
            </div>
        </div>
    )
}

export default ProfileMenu
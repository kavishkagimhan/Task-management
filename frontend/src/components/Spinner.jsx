import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

const Spinner = () => {
    return (
        <div className='w-screen h-[100vh]'>
            <div className='flex items-start justify-center'>
                <SyncLoader
                    color="#c262ec"
                    size={18}
                    speedMultiplier={0.8}
                />
            </div>
        </div>

    )
}

export default Spinner
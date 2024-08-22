import React from 'react'

const Errors = ({message}) => {
  return (
    <div className='text-red-500 text-md'>
        {message}
    </div>
  )
}

export default Errors
import React from 'react'

const ChangePass = () => {
    return (
        <>
            <label htmlFor="emailLose" className='text-center text-xl'>
                Correo electrónico:
            </label>
            <input
                type="text"
                id="emailLose"
                name={"emailLose"}
                required
                className='border-b focus:outline-none focus:ring-0 text-center'
            />
        </>
    )
}

export default ChangePass
import React from 'react'
import Container from '../Container'

const Header = () => {
    return (
        <>

            <div className="navbar shadow-sm bg-[#FFFDD0] border-b-1">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">StudyAI</a>
                </div>
                <div className="flex items-center gap-2">
                    <p>User Email</p>
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-error">Log Out</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
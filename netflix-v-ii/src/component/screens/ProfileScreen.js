import React from 'react';
import './css/ProfileScreen.css';
import Nav from '../Nav';
import { useSelector } from 'react-redux';
import { selectuser } from '../../features/userSlice';
import { authentication } from '../../firebase';

function ProfileScreen() {
    const user = useSelector(selectuser);
  return (
    <div className='profileScreen'>
        <Nav/>
        <div className='profileScreen__body'>
            <h1> Edit Profile</h1>
            <div className='ProfileScreen__info'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt=''
                />
                <div className='profileScreen__details'>
                    <h2>{user.email}</h2>
                    <div className='profileScreen__plans'>
                        <h3> Plans</h3>
                        <button onClick={()=>authentication.signOut()} className='profileScreen__signOut'>Sign Out</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
  )
}

export default ProfileScreen
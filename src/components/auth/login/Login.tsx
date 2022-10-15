import React, { FormEventHandler, SyntheticEvent, useState } from 'react';
import { setValue } from '../../utilities/FormFunctions';
import { UserLogin } from '../AuthInterfaces';
import { getUserByUid, logInWithEmailAndPassword, logout, signInWithGoogle } from '../firebase-auth';
import './Login.scss';

//Test AidanMc22, amcbrid22@gmail.com, Password123
export default function Login(){

    const [ userInfo, setUserInfo ] = useState<UserLogin>({email: '', password: ''});

    function submitForm(e: SyntheticEvent){
        e.preventDefault();
        console.log(userInfo)
        logInWithEmailAndPassword(userInfo.email, userInfo.password);
    }
    
    function signInWithGooglePopup(e: SyntheticEvent) {
        e.preventDefault();
        signInWithGoogle();
      }

    function updateForm(key: string, val: any) {
        setValue(key, val, userInfo, setUserInfo)
    }

    return(
        <div className='login-page'>

            <div className='login-wrapper'>
                <h3> Login </h3>
                <form onSubmit={submitForm} className=''> 
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' onChange={(e)=>updateForm('email', e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' name='password' onChange={(e)=>updateForm('password', e.target.value)}/>
                    </div>

                    <div className='center'>
                        <button type='submit'>Submit</button>
                        <button onClick={signInWithGooglePopup}>Sign in with Google </button>
                    </div>
                </form>
            </div>

            <p>Don't have an account? <a href="/register">sign up here</a></p>

        </div>
    )
}
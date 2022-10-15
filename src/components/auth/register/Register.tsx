import React , {SyntheticEvent, useState} from 'react'
import './Register.scss';
import { setValue } from '../../utilities/FormFunctions';
import { RegisterUser } from '../AuthInterfaces';
import { registerWithEmailAndPassword } from '../firebase-auth';

export default function Register() {

  const [ newUser, setUserInfo] = useState<RegisterUser>({name: '', password: '', email: ''});
  
  function submitForm(e: SyntheticEvent) {
    e.preventDefault();
    registerWithEmailAndPassword(newUser);
  }

  function updateForm(key: string, val: any){
    setValue(key, val, newUser, setUserInfo)
  }

  return (
    <div className='register-page'>
      <div className='register-wrapper'>

        <h3> Regsiter </h3>
        <form onSubmit={submitForm} className=''>
          <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' placeholder='Jonathan Donathan' onChange={(e)=>updateForm('name', e.target.value)}/>
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' placeholder='john_d@gmail.com' onChange={(e)=>updateForm('email', e.target.value)}/>
          </div>

          <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' placeholder='password123 ' onChange={(e)=>updateForm('password', e.target.value)}/>
          </div>

          <div className='center'>
            <button type='submit' className='submit-btn'>Submit</button>
          </div>
        </form> 
      </div>

      <p>Already have an account? <a href="/login">log in here</a></p>
    </div>
  )

}
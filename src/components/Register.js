import React from 'react';
import { register } from '../api/auth';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    character: 'alien',
    target_language: 'es'
  });

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await register(user);
        navigate(`/login`);
      } catch (error) {
        if (error.request) {
          console.log(error)
          setErrorMessage(error.request.statusText);
        } else {
          setErrorMessage('Error');
        }
      }
    };
    getData();
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <div className='flex items-center flex-col font-mono' style={{'height': 'calc(100vh - 130px)'}}>
      <div className='md:w-[650px] w-11/12 rounded-lg md:border md:border-8 border-teal-100 flex flex-col justify-between px-12 py-5 my-5 md:my-auto'>
        <h1 className='text-4xl font-bold w-full mb-3 title'>Register</h1>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <FormInput
            label='Username'
            type='text'
            required
            onChange={handleChange}
            name='username'
            value={user.username}
          />
          <FormInput
            label='Email'
            type='email'
            required
            onChange={handleChange}
            name='email'
            value={user.email}
          />
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={user.password}
          />
          <FormInput
            label='Confirm password'
            type='password'
            required
            onChange={handleChange}
            name='password_confirmation'
            value={user.password_confirmation}
          />
          <div className='pt-3'>
            <label for="character">Character:</label>
            <select name="character" onChange={handleChange}>
              <option value="alien">Alien</option>
              <option value="explorer">Explorer</option>
            </select>
          </div>
          <div className='pt-3'>
            <label for="target_language">Target language:</label>
            <select name="target_language" onChange={handleChange}>
              <option value="es">Spanish</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="col-span-2">
            <div
              className={`bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative ${
                !errorMessage && 'hidden'
              }`}
            >
              {errorMessage}
            </div>
          </div>
          <button
            type='submit'
            className='col-span-2 h-10 text-center bg-teal-200 hover:bg-teal-300 text-gray-800 font-semibold rounded shadow'
          >
            Register
          </button>
        </form>
        <p className='mt-5'>
          Have an account?
          <a className='ml-2 font-bold' href='/login'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

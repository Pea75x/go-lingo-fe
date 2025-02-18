import React from 'react';
import { login } from '../api/auth';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await login(user);
        navigate(`/`);
      } catch (error) {
        if (
          error.response?.data
        ) {
          setErrorMessage(error.response.data.detail);
        } else if (error.message) {
          setErrorMessage(error.message);
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
      <div className='w-[400px] rounded-lg border border-8 border-teal-100 flex flex-col justify-between px-12 py-5 my-auto'>
        <h1 className='text-4xl font-bold w-full mb-3 title'>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Username'
            type='text'
            required
            onChange={handleChange}
            name='username'
            value={user.username}
          />
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={user.password}
          />
          <div>
            <div
              className={`bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-6 rounded relative ${
                !errorMessage && 'hidden'
              }`}
            >
              {errorMessage}
            </div>
          </div>
          <button
            type='submit'
            className='w-1/3 h-10 text-center bg-white hover:bg-teal-200 text-gray-800 font-semibold rounded shadow mt-4'
          >
            Login
          </button>
        </form>
        <p className='mt-5'>
          Dont have an account?
          <a className='ml-2 font-bold' href='/register'>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

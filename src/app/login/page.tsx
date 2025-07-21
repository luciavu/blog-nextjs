'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Form from '../components/Form/Form';

const Login = () => {
  const { loginUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');

    const success = await login(username, password);
    if (success) {
      loginUser();
      router.push('/');
    } else {
      setErrorMessage('Username or password not found');
    }
  };
  return (
    <div>
      <Form
        title="Login"
        errorMessage={errorMessage}
        submit={handleLogin}
        fields={[
          {
            type: 'text',
            placeholder: 'username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            autocomplete: 'username',
          },
          {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            autocomplete: 'current-password',
          },
        ]}
      ></Form>
    </div>
  );
};

export default Login;

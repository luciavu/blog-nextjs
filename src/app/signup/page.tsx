'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../api/auth';
import Form from '../components/Form/Form';

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { success, message } = await signup(username, password);
    if (success) {
      router.push('/login');
    } else {
      setErrorMessage(message);
    }
  };
  return (
    <Form
      title="Sign up"
      errorMessage={errorMessage}
      submit={handleSignup}
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
          placeholder: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          autocomplete: 'new-password',
        },
      ]}
    ></Form>
  );
};

export default SignUp;

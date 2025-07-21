'use client';
import { useAuth } from '../context/AuthContext';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { username, isLoggedIn, isAdmin, id, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <div>
      <header className="flex-container">
        <div className="logo">
          <a href="https://github.com/luciavu/blog-nextjs" target="_blank">
            <FaGithub size={35} />
          </a>
          <h1>
            <Link href="/">Blog {isAdmin ? 'Admin' : ''}</Link>
          </h1>
          {isAdmin && (
            <h1>
              <Link href="/admin" className="dashboard">
                Dashboard
              </Link>
            </h1>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex-container">
              {' '}
              <p>
                Welcome {username}
                {id}
              </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="login-options">
              <Link href="/login">Login</Link>
              <Link href="/signup" className="register">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;

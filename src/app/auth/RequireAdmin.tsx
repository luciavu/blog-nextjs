'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ReactNode, useEffect } from 'react';

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }
  return children;
};

export default RequireAdmin;

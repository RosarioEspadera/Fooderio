import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import LoginButton from './LoginButton';

export default function LoginPage() {
  const navigate = useNavigate();

  // If already logged in, redirect home
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="login-page flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-2xl font-medium">Sign In to Fooderio</h2>
      <LoginButton />
      <p className="text-sm text-gray-600">
        You’ll be redirected back here once you complete Google Sign-In.
      </p>
    </div>
  );
}

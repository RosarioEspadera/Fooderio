// src/components/LoginButton.jsx
import { supabase } from '../lib/supabaseClient';

export default function LoginButton() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}

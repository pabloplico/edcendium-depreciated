import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    // Only run verification if token is available
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      setVerifying(true);
      setError('');

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email');
      }

      setVerified(true);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify email');
    } finally {
      setVerifying(false);
    }
  };

  if (!token && !verified && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Email Verification</h2>
          <p className="text-gray-600 mb-4">No verification token found. Please check your email for the verification link.</p>
          <div className="mt-6">
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Email Verification</h2>
        
        {verifying && (
          <div className="text-gray-600">
            <p className="mb-4">Verifying your email address...</p>
            <div className="loader mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <p className="mt-2">
              The verification link may have expired. Please request a new verification email.
            </p>
          </div>
        )}

        {verified && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Your email has been successfully verified! You can now sign in to your account.
          </div>
        )}

        <div className="mt-6">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            {verified ? 'Sign in to your account' : 'Return to login'}
          </Link>
        </div>
      </div>
    </div>
  );
}

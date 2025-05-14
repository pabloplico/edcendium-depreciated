import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Base Protected Route - ensures user is authenticated
export function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push(`/login?callbackUrl=${router.asPath}`);
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return session ? <>{children}</> : null;
}

// Teacher-only route
export function TeacherRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !session) {
      router.push(`/login?callbackUrl=${router.asPath}`);
      return;
    }
    
    // Redirect to dashboard if authenticated but not a teacher
    if (!loading && session && session.user.role !== 'teacher') {
      router.push('/dashboard');
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (session && session.user.role === 'teacher') ? <>{children}</> : null;
}

// Admin-only route
export function AdminRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !session) {
      router.push(`/login?callbackUrl=${router.asPath}`);
      return;
    }
    
    // Redirect to dashboard if authenticated but not an admin
    if (!loading && session && session.user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (session && session.user.role === 'admin') ? <>{children}</> : null;
}

// Student-only route
export function StudentRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !session) {
      router.push(`/login?callbackUrl=${router.asPath}`);
      return;
    }
    
    // Redirect to dashboard if authenticated but not a student
    if (!loading && session && session.user.role !== 'student') {
      router.push('/dashboard');
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (session && session.user.role === 'student') ? <>{children}</> : null;
}

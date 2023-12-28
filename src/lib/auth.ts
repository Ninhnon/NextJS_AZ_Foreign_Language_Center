import options from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function mustBeLoggedIn() {
  const session = await getServerSession(options);
  console.log('session: ', session);
  if (!session) {
    redirect('/auth/login');
  }
}
export async function getSession() {
  const session = await getServerSession(options);
  return session;
}

export async function alreadyLoggedIn() {
  const session = await getServerSession(options);
  console.log('sessionnnnn: ', session);
  if (session?.user?.role === 'admin') {
    redirect('/admin');
  } else if (session?.user?.role === 'user') {
    redirect('/admin');
  } else if (session?.user?.role === 'teacher') {
    redirect('/teacher');
  } else if (session?.user?.role === 'staff') {
    redirect('/staff');
  } else if (session) {
    redirect('/');
  }
}
export async function mustBeAdmin() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth/login');
  }
  if (session?.user?.role !== 'admin') {
    redirect('/');
  }
}
export async function mustBeUser() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth/login');
  }
  if (session?.user?.role !== 'user') {
    redirect('/');
  }
}
export async function mustBeTeacher() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth/login');
  }
  if (session?.user?.role !== 'teacher') {
    redirect('/');
  }
}
export async function mustBeStaff() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth/login');
  }
  if (session?.user?.role !== 'staff') {
    redirect('/');
  }
}

export async function mustBeRole() {
  const session = await getServerSession(options);
  console.log('🚀 ~ file: auth.ts:63 ~ mustBeRole ~ session:', session);
  if (session?.user?.role === 'admin') {
    redirect('/admin');
  }
  if (session?.user?.role === 'user') {
    redirect('/admin');
  }
  if (session?.user?.role === 'teacher') {
    redirect('/teacher');
  }
  if (session?.user?.role === 'staff') {
    redirect('/staff');
  }
}

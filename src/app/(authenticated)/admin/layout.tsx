import AdminHeader from '@/components/header/AdminHeader';
// import { mustBeLoggedIn } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await mustBeLoggedIn();

  return (
    <div className={`w-full h-full`}>
      <AdminHeader
        session={{ user: { avatar: '/teacher_1.png', name: 'ADMIN' } }}
      />
      {children}
    </div>
  );
}

import AdminHeader from '@/components/header/AdminHeader';
import { mustBeAdmin } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await mustBeAdmin();

  return (
    <div className={`w-full h-full`}>
      <AdminHeader
        session={{ user: { avatar: '/teacher_1.png', name: 'ADMIN' } }}
      />
      {children}
    </div>
  );
}

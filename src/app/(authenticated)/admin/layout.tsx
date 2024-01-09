import AdminHeader from '@/components/header/AdminHeader';
import { getSession, mustBeAdmin } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await mustBeAdmin();
  const session = getSession();

  return (
    <div className={`w-full h-full`}>
      <AdminHeader session={session} />
      {children}
    </div>
  );
}

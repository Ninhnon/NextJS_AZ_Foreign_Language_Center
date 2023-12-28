import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import AdminHeader from '@/components/header/AdminHeader';
import { getSession, mustBeStaff } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log(session);
  await mustBeStaff();
  return (
    <div className={`w-full h-full`}>
      <AdminHeader session={session} />
      {children}
      <Footer />
    </div>
  );
}

import { Footer } from '@/components/footer';
import StaffHeader from '@/components/header/StaffHeader';
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
      <StaffHeader session={session} />
      {children}
    </div>
  );
}

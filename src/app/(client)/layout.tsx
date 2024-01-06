import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getSession } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await mustBeRole();
  const session = await getSession();
  console.log(session);
  return (
    <div className={`w-full h-full`}>
      <Header session={session} />
      {children}
      <Footer />
    </div>
  );
}

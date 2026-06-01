import { Outlet } from 'react-router';
import { BackToTop } from '@/components/common/BackToTop';
import { Header } from './Header';
import { Footer } from './Footer';

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

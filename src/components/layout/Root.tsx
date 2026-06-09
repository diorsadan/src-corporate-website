import { Outlet } from 'react-router';
import { BackToTop } from '@/components/common/BackToTop';
import { OfflineAlertBanner } from '@/components/common/OfflineAlertBanner';
import { PageMeta } from '@/components/layout/PageMeta';
import { Header } from './Header';
import { Footer } from './Footer';

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta />
      <OfflineAlertBanner />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

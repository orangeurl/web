'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages without navbar/footer
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}



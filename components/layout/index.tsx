import Link from 'next/link';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
import { NavItem } from './nav-item';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Content({
  children
}: {
  children: React.ReactNode;
}) {

  return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <Logo />
                  <span className="">ACME</span>
                </Link>
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="flex flex-col">
            <Navbar />
            {children}
          </div>
        </div>
  );
}
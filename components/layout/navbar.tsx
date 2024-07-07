import Link from 'next/link';
import { User } from './user';
import { Logo } from '../icons';

export default function Navbar() {
    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
            <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
            >
                <Logo />
                <span className="">ACME</span>
            </Link>
            <User />
        </header>
    );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    GroundUpIcon,
    SettingsIcon,
    UserIcon,
    NotificationIcon,
    SeparationIcon
} from '@/components/Icons'

// Import Source Sans Pro font
import { Source_Sans_3 } from 'next/font/google';

const sourceSansPro = Source_Sans_3({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
    variable: '--font-source-sans-pro',
});

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className={`bg-white shadow-sm border-b border-gray-200 ${sourceSansPro.variable}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Logo and Navigation */}
                    <div className="flex items-center space-x-8">
                        {/* Logo/Image */}
                        <div className="flex-shrink-0">
                            <div className="flex items-center">
                                <GroundUpIcon />
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="hidden md:flex flex overflow-hidden">
                            <Link
                                href="/"
                                className={`relative flex items-center justify-center px-3 py-2 h-[75px] rounded text-[13px] font-normal leading-none transition w-[90px]
                                    ${
                                        isActive('/')
                                            ? 'bg-blue-50 border-t-2 border-b-2 border-[#E3E6EA] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-blue-500 after:rounded-b'
                                            : 'hover:bg-blue-50'
                                    }
                                `}
                            >
                                <span>DASHBOARD</span>
                            </Link>

                            <Link
                                href="/alerts"
                                className={`relative flex items-center justify-center px-3 py-2 h-[75px] rounded text-[13px] font-normal leading-none transition w-[90px]
                                    ${
                                        isActive('/alerts')
                                            ? 'bg-blue-50 border-t-2 border-b-2 border-[#E3E6EA] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-blue-500 after:rounded-b'
                                            : 'hover:bg-blue-50'
                                    }
                                `}
                            >
                                <span>ALERTS</span>
                            </Link>
                        </nav>
                    </div>

                    {/* Right side - Icons and Welcome Message */}
                    <div className="flex items-center space-x-4">
                        {/* Icons */}
                        <button className="p-2 text-[#5F6368] hover:text-[#5F6368] hover:bg-gray-100 rounded-md transition-colors">
                            <SettingsIcon />
                        </button>

                        <button className="p-2 text-[#5F6368] hover:text-[#5F6368] hover:bg-gray-100 rounded-md transition-colors">
                            <UserIcon />
                        </button>

                        <button className="p-2 text-[#5F6368] hover:text-[#5F6368] hover:bg-gray-100 rounded-md transition-colors relative">
                            <NotificationIcon />
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full border-2 border-white shadow">3</span>
                        </button>

                        <SeparationIcon />

                        {/* Welcome Message */}
                        <div className="hidden sm:block">
                            <span className="text-[13px] font-normal text-[#5F6368] leading-none">Welcome, Admin!</span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#5F6368] hover:text-[#5F6368] hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                            <Link
                                href="/"
                                className={`relative flex items-center space-x-2 px-3 py-2 rounded text-[13px] font-normal leading-none transition
                                    ${
                                        isActive('/')
                                            ? 'bg-blue-50 border-t-2 border-b-2 border-[#E3E6EA] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-blue-500 after:rounded-b'
                                            : 'hover:bg-blue-50'
                                    }
                                `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>DASHBOARD</span>
                            </Link>

                            <Link
                                href="/alerts"
                                className={`relative flex items-center space-x-2 px-3 py-2 rounded text-[13px] font-normal leading-none transition
                                    ${
                                        isActive('/alerts')
                                            ? 'bg-blue-50 border-t-2 border-b-2 border-[#E3E6EA] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-blue-500 after:rounded-b'
                                            : 'hover:bg-blue-50'
                                    }
                                `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>ALERTS</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 
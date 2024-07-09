"use client"

import { CacheProvider } from "@/lib/cacheContext";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'sonner'

export default function Providers({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <NextUIProvider>
            <CacheProvider>
                <Toaster richColors position="bottom-center" />
                {children}
            </CacheProvider>
        </NextUIProvider>
    );
}
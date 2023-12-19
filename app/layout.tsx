import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ContextProvider } from "@/contexts/ContextProvider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team Chat Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-white dark:bg-[#151515] w-screen overflow-x-hidden"
          )}
        >
          <ContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <SocketProvider>
                <ModalProvider />
                <QueryProvider>{children}</QueryProvider>
              </SocketProvider>
            </ThemeProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

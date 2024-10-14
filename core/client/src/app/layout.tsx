import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PreAlphaLabel from '@/components/pre-alpha-label';
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";
import { AutoConnectProvider } from "@/components/auto-connect-provider";
import { WalletProvider } from "@/components/wallet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trust 16",
  description: "A game of trust and strategy",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <a className="relative">
//           <PreAlphaLabel />
//         </a>
//         {children}
//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <AutoConnectProvider>
            <WalletProvider>
              <a className="relative">
                <PreAlphaLabel />
              </a>
              {children}
              <Toaster />
            </WalletProvider>
          </AutoConnectProvider>
      </body>
    </html>
  );
}

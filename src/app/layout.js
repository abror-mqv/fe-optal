import localFont from "next/font/local";
import "./globals.css";
import './styles/main.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OPTAL",
  description: "Optoviy portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
        {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

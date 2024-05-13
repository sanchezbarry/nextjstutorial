import '@/app/ui/global.css';
//this is the root layout, and it is required.
//import your fonts here, so they will be applied globally. 
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

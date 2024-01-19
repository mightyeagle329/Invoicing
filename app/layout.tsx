import { league_spartan } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={league_spartan.className}>
      <body className="flex flex-col sm:flex-row">
        <Navbar />
        <main className="flex flex-1">{children}</main>
      </body>
    </html>
  );
}

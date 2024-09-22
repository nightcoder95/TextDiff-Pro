import localFont from "next/font/local";
import "./globals.css";


export const metadata = {
  title: "TextDiff Pro",
  description: "Compare texts with ease. Spot differences instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

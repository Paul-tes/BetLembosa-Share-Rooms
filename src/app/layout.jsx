import "./globals.css"
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BetLembosa",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
        precedence="default"
      />
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
        type="text/css"
        precedence="default"
      ></link>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'

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

export const metadata: Metadata = {
  title: "WeatherNow | Instant Weather Search & Forecast",
  description: "Get real-time weather information and forecasts for any location. Easy-to-use weather search tool with accurate data.",
  keywords: [
    "weather search, local weather, weather forecast",
    "real-time weather, global weather app, weather conditions",
    "temperature checker, precipitation forecast, wind speed tracker",
    "humidity levels, UV index, air quality index",
    "weather alerts, climate data, weather map"
  ].join(", "),
  openGraph: {
    title: "WeatherNow - Your Instant Weather Information Hub",
    description: "Access accurate weather data for any location worldwide. Plan your day with our reliable forecasts and real-time updates.",
    images: [
      {
        url: "https://weathero.ludgi.ai/logo.png",
        width: 1200,
        height: 630,
        alt: "WeatherNow App Interface",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "WeatherNow",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherNow - Instant Weather Search & Forecast",
    description: "Find weather information for any location instantly. Get accurate forecasts, temperature, and more with WeatherNow.",
    images: ["https://weathero.ludgi.ai/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const pubId = "ca-pub-5823741955283998"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={pubId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Funding Choices 스크립트 */}
        <Script
          id="google-funding-choices"
          strategy="afterInteractive"
          src={`https://fundingchoicesmessages.google.com/i/${pubId}?ers=1`}
        />
        {/* Google FC Present 스크립트 */}
        <Script
          id="google-fc-present"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`
          }}
        />
      </body>
    </html>
  );
}

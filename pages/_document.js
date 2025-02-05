// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Fonts Optimization */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@400..700&family=Gruppo&family=Merienda:wght@300..900&family=PT+Sans+Narrow:wght@400;700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
            crossOrigin="anonymous"
          />

          {/* Essential Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="google-site-verification" content="JmSBZFdkEXBfpvuRnH5r4NfHm-ZAV3bvw6fuW_seW4w" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Explore Harmo's amazing portfolio showcasing web development and design skills." />
          <meta name="keywords" content="Harmo, portfolio, web development, Next.js, React, frontend, SEO" />
          <meta name="author" content="Humphrey Omondi" />
          <meta name="robots" content="index, follow" /> {/* Helps Google Index Faster */}

          {/* Canonical URL */}
          <link rel="canonical" href="https://harmo.vercel.app" />

          {/* Open Graph (Social Media Preview) */}
          <meta property="og:title" content="Harmo - Portfolio" />
          <meta property="og:description" content="Explore Harmo's amazing portfolio showcasing web development and design skills." />
          <meta property="og:image" content="https://harmo.vercel.app/og-image.jpg" />
          <meta property="og:url" content="https://harmo.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Card (For Twitter Previews) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Harmo - Portfolio" />
          <meta name="twitter:description" content="Explore Harmo's amazing portfolio showcasing web development and design skills." />
          <meta name="twitter:image" content="https://harmo.vercel.app/twitter-image.jpg" />

          {/* Favicon & App Icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* Structured Data (JSON-LD for Google Rich Results) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Harmo",
                "url": "https://harmo.vercel.app",
                "author": {
                  "@type": "Person",
                  "name": "Humphrey Omondi",
                  "url": "https://harmo.vercel.app"
                },
                "description": "Explore Harmo's amazing portfolio showcasing web development and design skills.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://harmo.vercel.app/?search={query}",
                  "query-input": "required name=query"
                }
              }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

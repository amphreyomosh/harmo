export default function handler(req, res) {
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://harmo.vercel.app/</loc>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>https://harmo.vercel.app/about</loc>
          <priority>0.8</priority>
        </url>
      </urlset>
    `);
  }
  
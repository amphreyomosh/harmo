import { useRef } from 'react';

export default function PortfolioSection({ portfolioRef }) {
  return (
    <section ref={portfolioRef} id="portfolio" className="py-20">
      {/* Your portfolio section content here */}
    </section>
  );
}

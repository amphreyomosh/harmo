import { useRef } from 'react';

export default function ContactSection({ contactRef }) {
  return (
    <section ref={contactRef} id="contact" className="py-20">
      {/* Your contact section content here */}
    </section>
  );
}

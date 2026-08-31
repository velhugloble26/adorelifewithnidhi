"use client";

import { usePathname } from "next/navigation";

export default function FloatingContactActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <div className="floating-contact-stack" aria-label="Contact actions">
    <a href="tel:+919833763977" className="floating-contact-button call-button" aria-label="Call Adore Life">
      <span className="material-symbols-outlined">call</span>
    </a>
    <a href="https://wa.me/919833763977?text=Hello%20Adore%20Life%2C%20I%20would%20like%20to%20book%20a%20session." className="floating-contact-button whatsapp-button" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.1 3.2C9.1 3.2 3.4 8.8 3.4 15.8c0 2.5.7 4.8 1.9 6.9L3.2 28l6-2c1.9 1.1 4.1 1.7 6.4 1.7 7 0 12.6-5.6 12.6-12.6S23.1 3.2 16.1 3.2zm0 2.1c5.8 0 10.5 4.7 10.5 10.5S21.9 26.3 16.1 26.3c-1.8 0-3.6-.5-5.1-1.3L8.4 26l.9-3.2A10.5 10.5 0 0 1 5.6 15.8C5.6 10 10.3 5.3 16.1 5.3zm-2.8 4.7c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 3.5 1.7 3.7c.2.2 2.8 4.7 7 6.4 3.4 1.4 4.1 1.1 4.8.9s2.3-1 2.6-2c.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.8-.6-.4-.3-2.3-1.2-2.7-1.3-.4-.1-.7-.1-1 .3-.3.4-.8 1.2-1 1.4-.3.2-.5.2-.9.1-.4-.1-1.8-.7-3.3-2.2-1.2-1.2-2-2.8-2.3-3.3-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.1-.2.1-.5 0-.7-.1-.2-.8-2.1-1.1-2.8-.3-.7-.6-.6-1-.6-.2 0-.5 0-.8.1-.3.1-.8.3-1.2.8-.5.6-1.8 1.7-1.8 4.1 0 2.5 1.9 4.7 2.1 5.1.3.4 3.5 5.6 8.8 7.6 5.2 2.1 5.2 1.4 6.2 1.3 1-.1 3.1-1.3 3.6-2.5.5-1.3.5-2.3.4-2.5-.1-.3-.4-.5-.9-.8-.5-.3-2.8-1.4-3.2-1.5-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.4 1.5-.3.2-.6.3-1 .1-.4-.2-1.8-.7-3.4-2.1-1.2-1-2-2.3-2.2-2.7-.2-.4-.2-.7.1-1 .2-.2.4-.4.6-.6.2-.2.4-.4.5-.7.1-.2.1-.4 0-.7-.1-.2-.7-1.8-1-2.6-.3-.8-.6-.7-.9-.7z" fill="currentColor" /></svg>
    </a>
  </div>;
}

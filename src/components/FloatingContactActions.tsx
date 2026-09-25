"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function FloatingContactActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <div className="floating-contact-stack" aria-label="Contact actions">
    <a href="tel:+919833763977" className="floating-contact-button call-button" aria-label="Call Adore Life">
      <span className="material-symbols-outlined">call</span>
    </a>
    <a href="https://wa.me/919833763977?text=Hello%20Adore%20Life%2C%20I%20would%20like%20to%20book%20a%20session." className="floating-contact-button whatsapp-button" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <MessageCircle aria-hidden="true" strokeWidth={2.25} />
    </a>
  </div>;
}

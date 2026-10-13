import React from "react";

/**
 * Lightweight, accessible vector icons for HERY's contact areas.
 * Drawn with inline SVG so they stay crisp on mobile and require no
 * third-party icon font, network request or new runtime dependency.
 */
export function WhatsAppIcon({ size = 24, className = "" }) {
  return (
    <svg className={`brand-icon brand-whatsapp ${className}`} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M32 5.5C17.35 5.5 5.5 17.35 5.5 32c0 4.65 1.2 9.05 3.3 12.86L5 59l14.49-3.8A26.35 26.35 0 0 0 32 58.5c14.65 0 26.5-11.85 26.5-26.5S46.65 5.5 32 5.5Z" fill="#25D366"/>
      <path d="M32 11.3c-11.42 0-20.7 9.28-20.7 20.7 0 3.86 1.07 7.59 3.08 10.81L11.9 52l9.45-2.48a20.6 20.6 0 0 0 10.65 2.98c11.42 0 20.7-9.28 20.7-20.7S43.42 11.3 32 11.3Z" stroke="white" strokeWidth="2.65" strokeLinejoin="round"/>
      <path d="M21.6 20.9c-1.22 0-2.36.51-3.2 1.51-1.23 1.44-1.95 3.32-1.53 5.38.74 3.7 3.49 7.77 7.01 11.28 3.61 3.6 7.99 6.12 11.66 6.83 2.4.47 4.55-.35 6.3-1.7 1.05-.82 1.86-2.1 2.07-3.35.11-.63-.18-.99-.75-1.26l-6.18-2.97c-.56-.27-1.05-.15-1.47.31l-2.57 3.11c-4.27-1.99-7.88-5.52-9.83-9.78l3.11-2.58c.46-.39.55-.87.3-1.43l-2.99-6.36c-.29-.62-.58-.9-1.24-.9Z" fill="white" transform="translate(2 0) scale(.93)"/>
    </svg>
  );
}

export function InstagramIcon({ size = 24, className = "" }) {
  return (
    <svg className={`brand-icon brand-instagram ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#C13584"/>
      <path d="M4 39C8 46 17 47 25 46H34C41 45 45 40 46 32V21C44 33 32 40 19 40 13 40 8 40 4 39Z" fill="#FCAF45"/>
      <path d="M2 25C6 14 16 6 27 2H34C41 2 46 7 46 14V21C42 31 34 35 25 37 15 38 8 34 2 32Z" fill="#E1306C"/>
      <path d="M22 2H34C41 2 46 7 46 14V20C39 24 33 24 29 18 25 12 21 7 22 2Z" fill="#833AB4"/>
      <rect x="11.5" y="11.5" width="25" height="25" rx="7.3" stroke="white" strokeWidth="3.2"/>
      <circle cx="24" cy="24" r="6.3" stroke="white" strokeWidth="3.1"/>
      <circle cx="32.5" cy="15.7" r="2.0" fill="white"/>
    </svg>
  );
}

export function TelephoneIcon({ size = 24, className = "" }) {
  return (
    <svg className={`brand-icon brand-telephone ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M13.6 6.9 8.2 9.8c-2.1 1.1-3.2 3.3-2.6 6.2 1.2 6 5.6 12.7 11.5 18.3 5.8 5.5 12.4 9.1 18.1 9 2.3-.1 4.2-1.5 5.2-3.5l2.1-4.3a2.7 2.7 0 0 0-1.4-3.6l-8.5-3.9a2.7 2.7 0 0 0-3.2.8l-3.1 3.8c-4.7-2.7-8.5-6.6-11.2-11.3l3.6-3.3a2.7 2.7 0 0 0 .7-3.2l-4.1-8.2a2.7 2.7 0 0 0-3.7-1.3Z" fill="#F1B645" stroke="#B77A17" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M11.5 12.3c.8 7 12.4 19.8 24.5 23.9" stroke="#FFE6A0" strokeLinecap="round" strokeWidth="2.3" opacity=".9"/>
    </svg>
  );
}

export function EmailIcon({ size = 24, className = "" }) {
  return (
    <svg className={`brand-icon brand-email ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="4" y="10" width="40" height="28" rx="5.5" fill="#F7C23A" stroke="#B88516" strokeWidth="1.4"/>
      <path d="M5.9 13 21.4 26a4 4 0 0 0 5.2 0L42.1 13" fill="#FFD968" stroke="#B88516" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6.2 35.6 18 25.5m23.8 10.1L30 25.5" stroke="#DDA226" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="m9 14 12.7 10.4a3.6 3.6 0 0 0 4.6 0L39 14" stroke="#FFF0B8" strokeWidth="2.3" strokeLinecap="round"/>
    </svg>
  );
}

export function LocationIcon({ size = 24, className = "" }) {
  return (
    <svg className={`brand-icon brand-location ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M24 3C13.5 3 6 10.4 6 21.2 6 33.7 24 46c18-12.3 18-24.8 18-24.8C42 10.4 34.5 3 24 3Z" fill="#EF4444" stroke="#BD242A" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 20.8C11 12 16.6 8 24 8" stroke="#FFB1AD" strokeWidth="2.6" strokeLinecap="round" opacity=".8"/>
      <circle cx="24" cy="21" r="8" fill="white"/>
      <circle cx="24" cy="21" r="4.3" fill="#F97064"/>
    </svg>
  );
}

export function AssistantIcon({ size = 28, className = "" }) {
  return (
    <svg className={`brand-icon brand-assistant ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M24 4.8C13.1 4.8 4.8 12.5 4.8 23c0 4.3 1.4 8.2 4 11.3L6.7 42l9.3-2.7c2.4 1.2 5.1 1.9 8 1.9 10.9 0 19.2-7.7 19.2-18.2S34.9 4.8 24 4.8Z" fill="#1189E7" stroke="#D4F0FF" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M15 17.5c4.3-5.8 11.1-6.8 17.5-2" stroke="#A8E5FF" strokeWidth="2.5" strokeLinecap="round" opacity=".85"/>
      <circle cx="15.8" cy="24.2" r="2.6" fill="white"/>
      <circle cx="24" cy="24.2" r="2.6" fill="white"/>
      <circle cx="32.2" cy="24.2" r="2.6" fill="white"/>
    </svg>
  );
}

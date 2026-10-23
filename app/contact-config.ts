export const CONTACT_EMAIL = "info@cargoworkslogistics.com";
export const CONTACT_PHONE_DISPLAY = "+91 79948 41888";
export const CONTACT_PHONE_TEL = "+917994841888";

// Verified business WhatsApp number with country code (defaults to +91 79948 41888)
const defaultNumber = "917994841888";
const rawNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultNumber).replace(/[\s()+-]/g, "");
export const WHATSAPP_NUMBER = /^[1-9]\d{7,14}$/.test(rawNumber) ? rawNumber : defaultNumber;

export function whatsappLink(message: string) {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : null;
}

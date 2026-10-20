export const CONTACT_EMAIL = "info@cargoworkslogistics.com";
// Set the verified business number with country code in .env.local.
const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[\s()+-]/g, "");
export const WHATSAPP_NUMBER = /^[1-9]\d{7,14}$/.test(number) ? number : "";
export function whatsappLink(message: string) {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : null;
}

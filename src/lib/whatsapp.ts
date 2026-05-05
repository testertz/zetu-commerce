// Placeholder WhatsApp number — replace with real number later
export const WHATSAPP_NUMBER = "255000000000";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

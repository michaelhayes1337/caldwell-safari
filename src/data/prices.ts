// Single source of truth for pricing.
// Published USD and EUR figures on the existing site map exactly at EUR = USD × 0.9
// (e.g. $400 → €360, $1,450 → €1,305, $3,000 deposit → €2,700), so we store USD and
// derive EUR to keep both currencies consistent and easy to update.

export interface PriceCell { usd: string; eur: string }
export interface Rate { label: string; note: string; price: PriceCell }
export interface Trophy { species: string; price: PriceCell; por?: boolean }

function money(n: number): PriceCell {
  return {
    usd: `$${n.toLocaleString("en-US")}`,
    eur: `€${Math.round(n * 0.9).toLocaleString("en-US")}`,
  };
}
const POR: PriceCell = { usd: "POR", eur: "POR" };

export const dailyRates: Rate[] = [
  { label: "1 Hunter × 1 Guide", note: "per person, per day", price: money(350) },
  { label: "2 Hunters × 1 Guide", note: "per person, per day", price: money(250) },
  { label: "Hunting Observer", note: "per person, per day", price: money(150) },
  { label: "Firearm Rental", note: "subject to caliber", price: money(150) },
  { label: "Self-Catering (1 × 1)", note: "per person, per day", price: money(150) },
];

export const included: string[] = [
  "Transfers to and from Johannesburg (OR Tambo) airport",
  "Accommodation, full catering and daily laundry service",
  "A licensed professional hunter, skinners and camp staff",
  "All licences and permits",
];

export const excluded: string[] = [
  "15% government-required tax (VAT)",
  "International airfare to and from South Africa",
  "Accommodation beyond the contracted safari period",
  "Gratuities, personal expenses and phone calls",
  "Rifles and ammunition",
  "Dipping, shipping and crating of trophies",
];

export const trophyFees: Trophy[] = [
  { species: "Baboon", price: money(400) },
  { species: "Blesbuck — Common", price: money(550) },
  { species: "Blesbuck — White", price: money(1000) },
  { species: "Impala", price: money(550) },
  { species: "Bushbuck", price: money(1450) },
  { species: "Caracal", price: money(2000) },
  { species: "Lechwe", price: money(3000) },
  { species: "Eland — Cape", price: money(3500) },
  { species: "Giraffe", price: money(3500) },
  { species: 'Kudu — under 55"', price: money(3500) },
  { species: 'Kudu — 55 to 60"', price: money(4250) },
  { species: 'Kudu — over 60"', price: POR, por: true },
  { species: "Crocodile", price: money(5500) },
  { species: "Buffalo", price: POR, por: true },
  { species: "Hippopotamus", price: POR, por: true },
];

export const deposit: PriceCell = money(3000);

// Basket pricing for the shop. Pure and framework-free.
export const FREE_SHIP_OVER = 7500; // cents
export const SHIP_FLAT = 590;
const KIT = ['wetsuit', 'boots', 'gloves']; // the cold-water "kit up" bundle

export function subtotal(items) {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}

// 15% off the wetsuit + boots + gloves when all three are in the basket.
export function bundleDiscount(items) {
  const has = (t) => items.some((i) => i.tag === t);
  if (!KIT.every(has)) return 0;
  const kit = items.filter((i) => KIT.includes(i.tag)).reduce((s, i) => s + i.price * i.qty, 0);
  return Math.round(kit * 0.15);
}

export function shipping(payable) {
  return payable >= FREE_SHIP_OVER ? 0 : SHIP_FLAT;
}

export function total(items) {
  const payable = subtotal(items) - bundleDiscount(items);
  return payable + shipping(payable);
}

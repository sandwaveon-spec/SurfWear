
'use strict';
let pass = 0, fail = 0;
const check = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL: ' + m); } };
const KIT = ['wetsuit', 'boots', 'gloves'];
const subtotal = (it) => it.reduce((s, i) => s + i.price * i.qty, 0);
const bundleDiscount = (it) => { const has = t => it.some(i => i.tag === t); if (!KIT.every(has)) return 0; const kit = it.filter(i => KIT.includes(i.tag)).reduce((s, i) => s + i.price * i.qty, 0); return Math.round(kit * 0.15); };
const shipping = (p) => p >= 7500 ? 0 : 590;
const total = (it) => { const p = subtotal(it) - bundleDiscount(it); return p + shipping(p); };

const tee = { price: 2800, qty: 2, tag: 'tee' };
const wet = { price: 18000, qty: 1, tag: 'wetsuit' };
const boot = { price: 5500, qty: 1, tag: 'boots' };
const glove = { price: 3500, qty: 1, tag: 'gloves' };

check(subtotal([tee]) === 5600, 'subtotal multiplies price by quantity');
check(shipping(5600) === 590, 'under the threshold pays flat shipping');
check(shipping(7500) === 0, 'at the threshold shipping is free');
check(bundleDiscount([wet, boot, glove]) === 4050, 'the full kit takes 15% off the three items');
check(bundleDiscount([wet, boot]) === 0, 'a partial kit gets no bundle discount');
check(total([{ price: 2800, qty: 2, tag: 'tee' }]) === 6190, 'two tees = $56 + $5.90 shipping');
check(total([{ price: 2800, qty: 1, tag: 'tee' }]) === 3390, 'one tee = $28 + $5.90 shipping');
check(total([wet, boot, glove, tee]) === 28550, 'kit + two tees: 32600 - 4050 bundle, ships free');
check(shipping(subtotal([wet]) - bundleDiscount([wet])) === 0, 'a wetsuit alone still ships free');

console.log((fail === 0 ? 'OK ' : 'FAIL ') + pass + ' checks, ' + fail + ' failures');
if (fail) process.exit(1);

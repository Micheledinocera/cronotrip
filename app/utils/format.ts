// Prices the Italian way: "12 €", "10,50 €".
export const formatPrice = (price: number) =>
  new Intl.NumberFormat('it-IT', {style: 'currency', currency: 'EUR', minimumFractionDigits: price % 1 ? 2 : 0}).format(price);

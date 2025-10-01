export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export function formatCurrency(
  price: number, 
  currency: string = 'BRL', 
  locale: string = 'pt-BR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(price);
}

export function formatNumber(value: number, locale: string = 'pt-BR'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function parsePrice(priceString: string): number | null {
  const cleanString = priceString
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');
  
  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? null : parsed;
}

export interface ProductPriceProps {
  amount: number;
  currency?: string;
  locale?: string;
}

export function ProductPrice({ amount, currency = 'USD', locale = 'en-US' }: ProductPriceProps) {
  return <span>{new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)}</span>;
}

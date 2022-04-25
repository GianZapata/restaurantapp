import 'intl';
import 'intl/locale-data/jsonp/en';
// or any other locale you need// Format amount mxn
export const formatNumber = (amount: number) => {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
};

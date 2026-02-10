export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (base: string) => {
    let sum = 0;
    let weight = base.length - 7;

    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * weight--;
      if (weight < 2) weight = 9;
    }

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const digit1 = calcDigit(cnpj.slice(0, 12));
  const digit2 = calcDigit(cnpj.slice(0, 13));

  return (
    digit1 === Number(cnpj[12]) &&
    digit2 === Number(cnpj[13])
  );
}
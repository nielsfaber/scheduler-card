const MAX_DECIMALS = 5;

export const roundFloat = (val: number) => {
  const pow = Math.pow(10, MAX_DECIMALS);
  val = Math.round(val * pow) / pow;
  return val;
}
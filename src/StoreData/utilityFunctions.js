export function decimalizer(n) {
  const price = Math.ceil(n);
  return price;
}
export const date = (d) => {
  let date = new Date(d);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

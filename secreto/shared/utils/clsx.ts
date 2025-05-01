export default function clsx(...args: any[]): string {
  return args
    .flat(Infinity)
    .filter((v) => typeof v === "string" && v.trim() !== "")
    .join(" ");
}

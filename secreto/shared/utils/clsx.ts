export default function clsx(...args: string[]) {
  return args.flat(Infinity).filter(Boolean).join(" ");
}

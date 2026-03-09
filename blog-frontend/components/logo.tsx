import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
}

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <Image src="/blogcraft-logo.svg" alt="BlogCraft logo" width={34} height={34} priority />
      <div className="leading-none">
        <p className="text-lg font-extrabold tracking-tight text-slate-900">BlogCraft</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Stories</p>
      </div>
    </Link>
  );
}

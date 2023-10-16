import Link from "next/link";

export default function Badger({ teks = null }) {
    return (
        <div className="flex items-center text-[10px] font-medium gap-2 uppercase">
            <Link href={'/'} className="hover:text-blue-500">beranda</Link>
            {
                teks ?
                    <>
                        <span>/</span>
                        <span>{teks}</span>
                    </>
                    : null
            }
        </div>
    )
}

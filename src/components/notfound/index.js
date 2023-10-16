import Image from "next/image";
import Link from "next/link";

export default function Notfound({ teks = 'teks' }) {
    return (
        <div>
            <div className="my-10 max-w-[600px] mx-auto">
                <div className="w-full h-full">
                    <Image
                        src={'/not-found.jpg'}
                        width={600}
                        height={600}
                        priority
                        alt="not found"
                    />
                </div>
                <div className="mt-5 text-center text-sm uppercase font-semibold">
                    waduh halaman <span className="text-red-600">{teks}</span> tidak di temukan
                </div>
                <div className="text-center my-5">
                    <div className="text-4xl font-extrabold text-gray-700">
                        404
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href={'/'}>
                        <div className="bg-blue-100 ring-blue-500 text-center ring-1 rounded-sm py-3 px-5 text-xs uppercase text-blue-600">
                            beranda
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

import Image from "next/image"
import Link from "next/link"
export default function ParentAuth({ children, data, tekslink = 'masuk' }) {
    return (
        <div className="min-w-full min-h-screen flex justify-center items-center">
            <div className="ring-1 ring-gray-100 bg-white shadow-sm max-w-[400px] w-[400px] mx-5 my-10 p-7 rounded-md">
                <div className="grid grid-cols-[auto,1fr] items-center gap-4">
                    <div className="w-[80px] h-[80px] relative">
                        <Image
                            src={'/logo.png'}
                            alt="logo kecimol"
                            fill
                            priority
                            sizes="100%"
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div>
                        <div className="uppercase text-sm font-semibold">
                            {data.judul}
                        </div>
                        <div className="text-xs font-medium">
                            {data.deskripsi}
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {children}
                </div>
                <div className="mt-5 grid grid-cols-[1fr,auto,1fr] gap-3 items-center justify-center">
                    <div className="border-b border-gray-200 w-full" />
                    <div className="text-[10px] uppercase font-medium">atau</div>
                    <div className="border-b border-gray-200 w-full" />
                </div>
                <div className="mt-5">
                    <Link href={`/${tekslink}`} className="bg-green-600 hover:bg-green-700 p-3 uppercase text-center font-medium text-sm block w-full text-gray-50">
                        {tekslink}
                    </Link>
                </div>
            </div>
        </div>
    )
}
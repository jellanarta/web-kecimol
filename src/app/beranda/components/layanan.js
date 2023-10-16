import Image from "next/image"
import Link from "next/link"

export default function Layanan() {
    return (
        <div>
            <div>
                <div className="text-center text-sm uppercase font-semibold md:text-base">
                    <span className="text-blue-600">kecimol</span> lombok nusa tenggara barat
                </div>
                <div className="text-center text-xs md:text-sm mt-3 max-w-[700px] mx-auto">
                    Dapatkan data lengkap semua <span className="text-blue-600">kecimol</span> lombok nusa tenggara barat ( NTB ). Temukan jadwal <span className="text-blue-600">kecimol</span> favorit anda hanya di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 px-0 md:px-5">
                <Cardlayanan tujuan='/jadwal/nyongkolan' deskripsi="Lihat semua jadwal nyongkolan dari semua kecimol yang sudah terdaftar di kecimol.com" judul="jadwal nyongkolan" />
                <Cardlayanan tujuan='/jadwal/nyambut' deskripsi="Lihat semua jadwal nyambut dari semua kecimol yang sudah terdaftar di kecimol.com" judul="jadwal nyambut" />
                <Cardlayanan tujuan='/jadwal/bejogetan' deskripsi="Lihat semua jadwal bejogetan dari semua kecimol yang sudah terdaftar di kecimol.com" judul="jadwal bejogetan" />
                <Cardlayanan tujuan='/jadwal/acara-lainnya' deskripsi="Lihat semua jadwal acara lainnya dari semua kecimol yang sudah terdaftar di kecimol.com" judul="jadwal acara lainnya" />
                <Cardlayanan tujuan='/kecimol' deskripsi="Daftar semua kecimol lombok nusa tenggara barat yang sudah bergabung di kecimol.com" ikon="kecimol" judul="daftar semua kecimol" />
                <Cardlayanan tujuan='/kecimol/sewa-kecimol' deskripsi="Temukan kecimol yang jadwalnya kosong pada tanggal tertentu untuk di gunakan pada acara anda" ikon="sewakecimol" judul="sewa kecimol " />
            </div>
        </div>
    )
}

function Cardlayanan({ ikon = 'typeacara', judul = "jadwal nyongkolan dan nyambut", deskripsi = 'deskripsi', tujuan }) {
    return (
        <div className="bg-white ring-1 ring-gray-100 rounded-sm p-5 grid grid-cols-1 gap-5">
            <div className="grid grid-cols-[auto,1fr] gap-3 items-center border-b border-dotted border-gray-200 pb-5">
                <div className="w-10 h-10">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt={judul}
                    />
                </div>
                <div className=" text-sm font-semibold uppercase md:text-base">
                    {judul}
                </div>
            </div>
            <div className="text-sm">
                {deskripsi}.
            </div>
            <div>
                <div className="border-t border-dotted border-gray-200 pt-5 flex">
                    <Link href={tujuan} className="bg-blue-600 hover:bg-blue-700 uppercase text-xs text-gray-50 px-4 py-3 rounded-sm">
                        lihat detail
                    </Link>
                </div>
            </div>
        </div>
    )
}
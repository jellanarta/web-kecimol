import Image from "next/image";
import moment from "moment";
import 'moment/locale/id'
moment.locale('id')
export default function Pengelola({ data, kecimol }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="uppercase font-semibold text-sm">
                    daftar pengelola kecimol <span className="text-blue-600">{kecimol.nama}</span>
                </div>
            </div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                {
                    data?.length ?
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
                            {
                                data.map((dt, idx) => (
                                    <Daftarpengelola kecimol={kecimol} data={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="text-center text-sm">
                            Tidak ada pengelola yang di tambahkan oleh pemilik kecimol
                        </div>
                }
            </div>
        </div>
    )
}

function Daftarpengelola({ data, nomor = 1, kecimol }) {
    return (
        <div className="ring-1 ring-gray-200 rounded-sm ">
            <div className="grid grid-cols-[1fr,auto] p-5 items-center gap-2 border-b border-gray-100">
                <div className="grid grid-cols-[auto,1fr] items-center gap-3">
                    <div className="w-[50px] h-[50px] rounded-full relative">
                        <Image
                            src={data.user?.poto_profil ? `${process.env.NEXT_PUBLIC_SERVER}/profil-user/${data.user?.poto_profil}` : '/no-user.gif'}
                            sizes="100%"
                            fill
                            style={{
                                objectFit: 'cover',
                                borderRadius: '100%'
                            }}
                            alt={data?.user?.nama}
                        />
                    </div>
                    <div>
                        <div className="text-xs font-semibold uppercase">
                            {data.user?.nama}
                        </div>
                        <div className="text-xs text-gray-700">
                            {data.user?.email}
                        </div>
                    </div>
                </div>
                <div className="ring-1 ring-orange-600 rounded-full w-[30px] h-[30px] flex justify-center items-center font-semibold text-sm">
                    {nomor}
                </div>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-3 items-center">
                    {/* nama dan nama kecimol dan tanggal  menjadi pengelola */}
                    <div className="text-xs uppercase">
                        <span className="font-semibold text-orange-600">{data.user?.nama}</span> mengelola kecimol <span className="text-blue-600 font-semibold">{kecimol.nama}</span> sejak <span className="">{moment(data.createdAt).format("dddd, D MMMM YYYY")}</span>
                    </div>
                    {/* nama dan nama kecimol dan tanggal  menjadi pengelola */}
                    {/* jadwal yang di posting */}
                    <div className="text-xs uppercase">
                        jadwal yang di posting ke kecimol <span className="text-blue-600 font-semibold">{kecimol.nama}</span> <span className="font-semibold">{data.totaljadwal}</span> jadwal
                    </div>
                    {/* jadwal yang di posting */}
                </div>
            </div>
        </div>
    )
}
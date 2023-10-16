import Image from "next/image";
import moment from "moment";
import 'moment/locale/id'
moment.locale('id')
export default function Tentang({ data }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="uppercase font-semibold text-sm">
                    tentang kecimol <span className="text-blue-600">{data.nama}</span>
                </div>
            </div>
            <div className="bg-white rounded-sm px-5 py-7 m-5 grid grid-cols-1 gap-5">

                {/* deskripsi */}
                <div className="text-sm border-b border-dotted border-gray-200 pb-5">
                    <div className="text-sm uppercase mb-3 font-semibold">
                        deskripsi kecimol <span className="text-blue-600">{data.nama}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
                </div>
                {/* deskripsi */}
                {/* pemilik kecimol */}
                <div className="text-sm border-b border-dotted border-gray-200 pb-5">
                    <div className="text-sm uppercase mb-3 font-semibold">
                        pemilik kecimol <span className="text-blue-600">{data.nama}</span>
                    </div>
                    <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                        <div className="w-12 h-12 rounded-full relative">
                            <Image
                                src={data.user?.poto_profil ? `${process.env.NEXT_PUBLIC_SERVER}/profil-user/${data.user.poto_profil}` : '/no-user.gif'}
                                sizes="100%"
                                fill
                                alt={data.user?.nama}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '100%'
                                }}
                            />
                        </div>
                        <div>
                            <div className="text-sm uppercase font-semibold">
                                {data.user?.nama}
                            </div>
                            <div className="text-xs">
                                {data.user?.email}
                            </div>
                        </div>
                    </div>
                </div>
                {/* pemilik kecimol */}
                {/* tanggal bergabung kecimol */}
                <div className="text-sm">
                    <div className="text-sm uppercase mb-3 font-semibold">
                        tanggal bergabung kecimol <span className="text-blue-600">{data.nama}</span>
                    </div>
                    <div className="text-xs uppercase">
                        {moment(data.createdAt).format("dddd, D MMMM YYYY")}
                    </div>
                </div>
                {/* tanggal bergabung kecimol */}
            </div>
        </div>
    )
}

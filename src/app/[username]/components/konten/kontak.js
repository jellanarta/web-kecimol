import Image from "next/image";

export default function Kontak({ data }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="uppercase font-semibold text-sm">
                    hubungi kecimol <span className="text-blue-600">{data.nama}</span> melaluii kontak di bawah ini
                </div>
            </div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className=" grid grid-cols-1 gap-5">
                    <div className="border-b border-dotted border-gray-200 pb-4">
                        <div className="text-sm font-semibold uppercase">
                            nomor hp kecimol
                        </div>
                        <div className="grid grid-cols-[auto,1fr] gap-3 items-center mt-2">
                            <div className="w-4 h-4">
                                <Image
                                    src={'/icons/phone.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                            <div className="text-xs">
                                {data.nomor_hp}
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-dotted border-gray-200 pb-4">
                        <div className="text-sm font-semibold uppercase">
                            email pemilik kecimol
                        </div>
                        <div className="grid grid-cols-[auto,1fr] gap-3 items-center mt-2">
                            <div className="w-4 h-4">
                                <Image
                                    src={'/icons/email.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                            <div className="text-xs">
                                {data.user?.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

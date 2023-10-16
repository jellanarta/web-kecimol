import Image from "next/image"
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Userbulanini({ datadashboard, namabulan }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    user baru pada <span className="text-blue-600">{namabulan}</span>
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard.userbulanini && datadashboard.userbulanini?.length ?
                        <div>
                            {
                                datadashboard.userbulanini.map((dt, idx) => (
                                    <Carduseroke user={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Tidak ada user yang bergabung pada bulan <span className="text-blue-600">{namabulan}</span>
                        </div>
                }
            </div>
        </div>
    )
}

function Carduseroke({ user, nomor = 1 }) {
    return (
        <div className="ring-1 ring-gray-100 rounded-sm p-5 grid gap-3 grid-cols-[auto,1fr] bg-white">
            <div className="text-sm font-semibold">
                {nomor}.
            </div>
            <div className="text-sm uppercase font-semibold">
                {user.nama}
            </div>
            <div />
            <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
                <div className="w-3 h-3">
                    <Image
                        src={'/icons/email.svg'}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className="text-xs">
                    {user.email}
                </div>
                <div className="w-3 h-3">
                    <Image
                        src={'/icons/date.svg'}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className="text-xs">
                    {moment(user.createdAt).format("dddd, D MMMM YYYY")}
                </div>
            </div>
        </div>
    )
}
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Pengikutkecimol({ datadashboard }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    20 pengikut baru dari kecimol anda
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard.duapuluhpengikut?.length ?
                        datadashboard.duapuluhpengikut.map((dt, idx) => (
                            <Orangmengikuti data={dt} key={idx} nomor={idx + 1} />
                        ))
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Belum ada pengguna yang mengikuti kecimol
                        </div>
                }
            </div>
        </div>
    )
}

function Orangmengikuti({ data, nomor }) {
    return (
        <div className="ring-1 ring-gray-100 rounded-sm bg-white p-5">
            <div className="grid grid-cols-[auto,1fr] gap-3">
                <div className="text-sm font-semibold">
                    {nomor}.
                </div>
                <div className="text-sm uppercase font-semibold">
                    {data?.user?.nama}
                </div>
                <div />
                <div className="grid grid-cols-1 gap-2">
                    <div className="text-xs uppercase">
                        mengikuti kecimol <span className="text-blue-600">{data?.kecimol?.nama}</span>
                    </div>
                    <div className="text-xs uppercase">
                        pada <span className="text-orange-600">{moment(data?.createdAt).format('dddd, D MMMM YYYY')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Pengelolakecimol({ datadashboard }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    pengelola kecimol yang di tambahkan
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard?.daftarpengelolakecimol?.length ?
                        <div>
                            {
                                datadashboard.daftarpengelolakecimol.map((dt, idx) => (
                                    <Pengeloladitambah data={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Tidak ada user yang anda tambahkan sebagai pengelola
                        </div>
                }
            </div>
        </div>
    )
}

function Pengeloladitambah({ data, nomor = 1 }) {
    return (
        <div className="ring-1 ring-gray-100 rounded-sm p-5 bg-white grid grid-cols-[auto,1fr] gap-3">
            <div className="text-sm font-semibold">
                {nomor}.
            </div>
            <div className="text-sm uppercase font-semibold">
                {data?.user?.nama}
            </div>
            <div />
            <div className="text-xs uppercase">
                mengelelola kecimol <span className="text-blue-600">{data?.kecimol?.nama}</span> sejak <span className="text-orange-600">{moment(data?.createdAt).format('dddd, D MMMM YYYY')}</span>
            </div>
        </div>
    )
}
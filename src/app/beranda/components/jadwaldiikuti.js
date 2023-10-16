import moment from "moment"
import 'moment/locale/id'
import Jadwal from "@/components/card/jadwal"
moment.locale('id')
export default function Jadwaldiikuti({ databeranda }) {
    return (
        <>
            {
                databeranda && databeranda.jadwalkecimoldiikuti ?
                    databeranda.jadwalkecimoldiikuti.length ?
                        <div>
                            <div>
                                <div className="text-sm font-semibold uppercase">
                                    jadwal kecimol
                                </div>
                                <div className="text-xs">
                                    jadwal kecimol yang di ikuti pada tanggal <span className="text-blue-600">{moment().format("dddd, D MMMM YYYY").toLowerCase()}</span>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                                {
                                    databeranda.jadwalkecimoldiikuti.map((dt, idx) => (
                                        <Jadwal jadwal={dt} nomor={idx + 1} key={idx} />
                                    ))
                                }
                            </div>
                        </div>
                        : null
                    : null
            }
        </>
    )
}

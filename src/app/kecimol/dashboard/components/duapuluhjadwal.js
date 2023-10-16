import Jadwal from "@/components/card/jadwal"
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Duapuluhjadwal({ datadashboard }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    20 jadwal semua kecimol anda bulan <span className="text-blue-600">{moment().format('MMMM YYYY')}</span>
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard.jadwalbulanini && datadashboard.jadwalbulanini?.length ?
                        <div className="grid grid-cols-1 gap-5">
                            {
                                datadashboard.jadwalbulanini.map((dt, idx) => (
                                    <Jadwal jadwal={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Jadwal kecimol pada bulan <span className="text-blue-600">{moment().format("MMMM YYYY")}</span> kosong
                        </div>
                }
            </div>
        </div>
    )
}

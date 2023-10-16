import Kecimol from "@/components/card/kecimol";
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Daftarkecimol({ datalengkap }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    daftar kecimol yang jadwal <span className="text-blue-600">{datalengkap.query?.kategoriacara}</span> kosong pada tanggal <span className="text-orange-600">{moment(datalengkap.query?.tanggal).format('dddd, D MMMM YYYY')}</span>
                </div>
            </div>
            <div className="m-5">
                {
                    datalengkap.data.length ?
                        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {
                                datalengkap.data.map((dt, idx) => (
                                    <Kecimol kecimol={dt} nomor={idx + 1} key={idx} userhapus={false} nonaktivkankecimol={true} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                            Belum ada kecimol yang jadwal <span className="text-blue-600">{datalengkap.query?.kategoriacara}</span> kosong pada tanggal <span className="text-orange-600">{moment(datalengkap.query?.tanggal).format('dddd, D MMMM YYYY')}</span>
                        </div>
                }
            </div>
        </div>
    )
}

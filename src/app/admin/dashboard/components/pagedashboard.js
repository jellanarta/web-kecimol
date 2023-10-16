import Kotakdashboard from "@/components/card/kotakdashboard";
import Statistikadmin from "./statistikadmin";
import Userbulanini from "./userbulanini";
import Kecimolbulanini from "./kecimolbulanini";
import Jadwalbulanini from "./jadwalbulanini";
import moment from "moment";
import 'moment/locale/id'
moment.locale('id')
export default function Pagedashboard({ datadashboard }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    dashboard admin
                </div>
                <div className="text-xs">
                    ringkasan data yang disimpan di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mx-5 xl:grid-cols-4">
                <Kotakdashboard totaldata={datadashboard.totaluser} icon="userperson" bg="bg-blue-600" teks="semua user" />
                <Kotakdashboard totaldata={datadashboard.totalkecimol} icon="kecimol" bg="bg-orange-600" teks="semua kecimol" />
                <Kotakdashboard totaldata={datadashboard.totaljadwal} icon="book" bg="bg-green-600" teks="semua jadwal" />
                <Kotakdashboard totaldata={datadashboard.jadwalhariini} icon="book" bg="bg-violet-600" teks="hari ini" />
            </div>
            {/* statistik admin */}
            <Statistikadmin datadashboard={datadashboard} />
            {/* statistik admin */}
            {/* data lainnya */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <div className="grid grid-cols-1 gap-5">
                        <Userbulanini datadashboard={datadashboard} namabulan={moment().format("MMMM YYYY")} />
                        <Kecimolbulanini datadashboard={datadashboard} namabulan={moment().format("MMMM YYYY")} />
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-5">
                        <Jadwalbulanini datadashboard={datadashboard} namabulan={moment().format("MMMM YYYY")} />
                    </div>
                </div>
            </div>
            {/* data lainnya */}
        </div>
    )
}

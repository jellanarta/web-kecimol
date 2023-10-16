import Kotakdashboard from "@/components/card/kotakdashboard";
import Datalainnya from "./datalainnya";

export default function Pagedashboard({ datadashboard }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    dashboard kecimol
                </div>
                <div className="text-xs">
                    ringkasan data semua kecimol anda yang sudah tergabung di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            {/* total data */}
            <div className="grid grid-cols-2 gap-5 mx-5 xl:grid-cols-4">
                <Kotakdashboard totaldata={datadashboard.totaljadwal} icon="book" bg="bg-green-600" teks="jadwal" />
                <Kotakdashboard totaldata={datadashboard.totalpengikut} icon="diikuti" teks="pengikut" bg='bg-blue-700' />
                <Kotakdashboard totaldata={datadashboard.totalkecimol} icon="kecimol" teks="kecimol" bg="bg-orange-600" />
                <Kotakdashboard totaldata={datadashboard.totalpengelola} icon="pengelolakecimol" bg="bg-violet-700" teks="pengelola kecimol" />
            </div>
            {/* total data */}
            {/* data lainnya */}
            <Datalainnya datadashboard={datadashboard} />
            {/* data lainnya */}
        </div>
    )
}

import { formatAngkaRBJT } from "../../../../lib/fnc"

export default function Totaluserkecimoljadwal({ datadashboard }) {
    return (
        <div>
            <div>
                <div className="text-center text-sm uppercase font-semibold md:text-base">
                    total user, kecimol dan jadwal di <span className="text-blue-600">kecimol.com</span>
                </div>
                <div className="text-center text-xs md:text-sm mt-3 max-w-[700px] mx-auto">
                    Total semua data user, data kecimol dan data jadwal yang disimpan di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            <div className="mt-8 flex justify-center items-center gap-8 flex-wrap">
                <Cardtotaldata judul="total user" totaldata={datadashboard?.totaldata?.user} />
                <Cardtotaldata judul="total kecimol" totaldata={datadashboard?.totaldata?.kecimol} />
                <Cardtotaldata judul="total jadwal" totaldata={datadashboard?.totaldata?.jadwal} />
            </div>
        </div>
    )
}

function Cardtotaldata({ totaldata = 10000, judul = 'total user' }) {
    return (
        <div>
            <div className="text-6xl font-extrabold text-gray-700 text-center">
                {formatAngkaRBJT(totaldata)}
            </div>
            <div className="text-[11px] uppercase text-center mt-1">
                {judul}
            </div>
        </div>
    )
}
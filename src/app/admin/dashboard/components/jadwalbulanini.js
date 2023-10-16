import Jadwal from "@/components/card/jadwal";

export default function Jadwalbulanini({ datadashboard, namabulan }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    semua jadwal kecimol bulan <span className="text-blue-600">{namabulan}</span>
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard.jadwalbulanini && datadashboard.jadwalbulanini?.length ?
                        <div className="grid gap-5">
                            {
                                datadashboard.jadwalbulanini.map((dt, idx) => (
                                    <Jadwal jadwal={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Tidak ada jadwal kecimol pada bulan <span className="text-blue-600">{namabulan}</span>
                        </div>
                }
            </div>
        </div>
    )
}

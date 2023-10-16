import Kecimol from "@/components/card/kecimol";

export default function Kecimolbulanini({ datadashboard, namabulan }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    kecimol baru bulan <span className="text-blue-600">{namabulan}</span>
                </div>
            </div>
            <div className="m-5">
                {
                    datadashboard && datadashboard.kecimolbulanini && datadashboard.kecimolbulanini?.length ?
                        <div className="grid gap-5">
                            {
                                datadashboard.kecimolbulanini.map((dt, idx) => (
                                    <Kecimol userhapus={false} adminhapus={false} kecimol={dt} nomor={idx + 1} key={idx} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Tidak ada kecimol yang bergabung pada bulan <span className="text-blue-600">{namabulan}</span>
                        </div>
                }
            </div>
        </div>
    )
}

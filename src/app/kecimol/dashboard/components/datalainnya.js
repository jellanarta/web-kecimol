import Duapuluhjadwal from "./duapuluhjadwal";
import Pengelolakecimol from "./pengelolakecimol";
import Pengikutkecimol from "./pengikutkecimol";
import Statistikkecimol from "./statistikkecimol";

export default function Datalainnya({ datadashboard }) {
    return (
        <div>
            {/* statistik */}
            <Statistikkecimol datadashboard={datadashboard} />
            {/* statistik */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <div className="grid grid-cols-1 gap-5">
                        <Pengikutkecimol datadashboard={datadashboard} />
                        <Pengelolakecimol datadashboard={datadashboard} />
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-5">
                        <Duapuluhjadwal datadashboard={datadashboard} />
                    </div>
                </div>
            </div>
        </div>
    )
}

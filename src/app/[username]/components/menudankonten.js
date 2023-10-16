import Konten from './konten'
import Menukontenprofil from './menukontenprofil'

export default function Menudankonten({ kecimol }) {
    return (
        <div>
            <Menukontenprofil kecimol={kecimol} />
            <Konten kecimol={kecimol} />
        </div>
    )
}

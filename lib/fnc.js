import moment from "moment"
import 'moment/locale/id'
moment.locale("id")
// menghitung jadi k rb atau jt
export const formatAngkaRBJT = angka => {
    const nomor = Number.parseInt(angka)
    if (nomor >= 1000000) {
        return (nomor / 1000000).toFixed(1) + 'jt'
    } else if (nomor >= 1000) {
        return (nomor / 1000).toFixed(1) + 'rb'
    }
    return nomor
}

// ambil nama bulan
export function limaBulanJadwal(type = 'cari bulan', bulan = null) {
    if (type === 'cari bulan') {
        const nahbaruknni = []
        const hariini = moment()
        const cobakn = hariini.clone().subtract(1, 'months')
        nahbaruknni.push(cobakn.format("MMMM YYYY"))
        nahbaruknni.push(hariini.format("MMMM YYYY"))
        for (let i = 1; i <= 3; i++) {
            const futurday = hariini.clone().add(i, 'months')
            const jarinni = futurday.format("MMMM YYYY")
            nahbaruknni.push(jarinni)
        }
        return nahbaruknni
    } else if (type === "cari awal dan akhir") {
        const bulanni = []
        for (let i = 0; i < 12; i++) {
            bulanni.push(moment().month(i).format("MMMM"))
        }
        if (bulan) {
            const jadikansatu = bulan.split(" ")
            const kepiren = bulanni.indexOf(jadikansatu[0])
            if (kepiren !== -1) {
                const bulannya = kepiren
                const tahunnya = jadikansatu[1]
                const hasilawal = new Date(Number.parseInt(tahunnya), bulannya, 1)
                const hasilakhir = new Date(Number.parseInt(tahunnya), bulannya + 1, 0)
                return { awal: hasilawal.getTime(), akhir: hasilakhir.getTime() }
            }
        }
    }
}

export function limaBulanTerakhir() {
    const nahbaruknni = []
    const hariini = moment()
    for (let i = 0; i < 6; i++) {
        const bulanbelakang = hariini.clone().subtract(i, 'months')
        nahbaruknni.unshift(bulanbelakang.format("MMMM YYYY"))
    }
    return nahbaruknni
}

export function cekjamrequestjadwal() {
    const tanggal = moment()
    const jamsekarang = tanggal.hours()
    if (jamsekarang >= 16) {
        const besok = tanggal.add(1, 'days')
        return besok.startOf('day').valueOf()
    } else {
        return tanggal.startOf('day').valueOf()
    }
}
export function bukamenukelolakecimol(statekecimol) {
    const kecimolaktiv = []
    if (statekecimol.status === "success") {
        if (statekecimol.kecimol.length) {
            statekecimol.kecimol.map(dt => {
                if (!kecimolaktiv.length) {
                    if (dt.statusKecimol) {
                        kecimolaktiv.push(dt)
                    }
                }
            })

        }
    }
    if (kecimolaktiv.length) {
        return true
    } else {
        return false
    }
}

export const bukamenuBuatJadwal = data => {
    let hasil = false
    const { statekecimol, statedikelola } = data
    if (statekecimol && statedikelola) {
        if (statekecimol.status === "success" && statedikelola.status === "success") {
            const panjang = []
            if (statekecimol.kecimol.length) {
                statekecimol.kecimol.map(dt => {
                    if (dt.statusKecimol) {
                        panjang.push(dt)
                    }
                })
            }
            if (statedikelola.dikelola.length) {
                statedikelola.dikelola.map(dt => {
                    if (dt.status && dt.kecimol.statusKecimol) {
                        panjang.push(dt)
                    }
                })
            }
            if (panjang.length) {
                hasil = true
            }
        }
    }
    return hasil
}

export const bukaMenuadmin = (data, role = []) => {
    let hasil = false
    if (data.status === "success" && data.login) {
        if (role.includes(data.user?.role)) {
            hasil = true
        }
    }
    return hasil
}
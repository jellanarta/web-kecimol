export const base64ToImg = (dataurl, filename = "profil_kecimol") => {
    if (!dataurl) {
        return null
    }
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)
    if (!mime) {
        return null
    } else {
        const gtr = mime[1]
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);

        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }

        const file = new File([u8arr], filename, { type: gtr });
        return file;
    }
}
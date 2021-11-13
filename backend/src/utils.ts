export const urlCleanRegexp = new RegExp(/[^a-z0-9-_.~]/ig);

export function removeHungarianSpecialCharacters(s: string) {
    return s.replace(/[ÁÄ]/g, 'A')
        .replace(/á/g, 'a')
        .replace(/É/g, 'E')
        .replace(/é/g, 'e')
        .replace(/[ÓŐÖ]/g, 'O')
        .replace(/[óöő]/g, 'o')
        .replace(/[ÚÜŰ]/g, 'U')
        .replace(/[üúű]/g, 'u')
        .replace(/í/g, 'i')
        .replace(/Í/g, 'I');
}

export function urlCleanString(s: string) {
    return removeHungarianSpecialCharacters(s)
        .replace(/\s/g, '-')
        .replace(urlCleanRegexp, '');
}
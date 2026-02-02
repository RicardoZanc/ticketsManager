export const getTime = {
    inHours: (time: number)=>    time * 60 * 60 * 1000,
    inMinutes: (time: number) => time * 60 * 1000,
    inSeconds: (time: number) => time * 1000,
}
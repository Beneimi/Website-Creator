export const tokenExpiryInMinutes = 45

export function getMillisecondByMinute(minutes:number){
    return minutes * 60000;
}

export function getSecondByMinute(minutes:number){
    return minutes * 60;
}
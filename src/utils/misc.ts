export const wait = (timeout: number): Promise<void> => {
    // Defined the timeout function for testing purpose
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export function formatSeconds(seconds: number): string {
    seconds = Math.round(seconds);
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    // Adding a leading zero if minutes/remainingSeconds are less than 10
    const formattedMinutes: string =
        minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds: string =
        remainingSeconds < 10
            ? `0${remainingSeconds}`
            : remainingSeconds.toString();

    return `${formattedMinutes}:${formattedSeconds}`;
}

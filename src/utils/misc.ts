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

export function hexToRGBA(hex, alpha = 1) {
    // Remove the hash at the start if it's there
    hex = hex.replace('#', '');

    // Parse the hex string into r, g, b
    let r, g, b;

    // Support three-character hex strings
    if (hex.length === 3) {
        r = parseInt(hex.charAt(0).repeat(2), 16);
        g = parseInt(hex.charAt(1).repeat(2), 16);
        b = parseInt(hex.charAt(2).repeat(2), 16);
    }
    // Support six-character hex strings
    else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error('Invalid HEX color.');
    }

    // Clamp and parse the alpha value to a number
    alpha = Math.max(0, Math.min(1, parseFloat(alpha)));

    // Return the RGBA color string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

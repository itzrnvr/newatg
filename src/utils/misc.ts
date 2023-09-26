export const wait = (timeout: number): Promise<void> => {
    // Defined the timeout function for testing purpose
    return new Promise(resolve => setTimeout(resolve, timeout));
};

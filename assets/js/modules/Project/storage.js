export function readStoredJSON(key) {
    try {
        const value = localStorage.getItem(key);
        if (!value) return null;

        return JSON.parse(value);
    } catch {
        try {
            localStorage.removeItem(key);
        } catch {
            // Storage may be unavailable, such as in a restricted browser context.
        }
        return null;
    }
}

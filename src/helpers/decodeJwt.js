function decodeJwt(token) {
    try {
        const [, payloadBase64] = token.split('.');

        const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));

        const payload = JSON.parse(payloadJson);

        const { sub, roles } = payload;

        return {
            sub: sub || null,
            roles: roles || [],
        };
    } catch (error) {
        console.error("Invalid JWT:", error.message);
        return { error: "Invalid or malformed JWT." };
    }
}

export default decodeJwt;
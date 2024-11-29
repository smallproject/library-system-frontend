import {jwtDecode} from "jwt-decode";

function decodeTokenAndDeclare(token) {
    if (!token) {
        console.error("No token provided")
        return null;
    }

    try {

        const decodedToken = jwtDecode(token);

        localStorage.setItem('token', token);

        const UserId = getUserId(decodedToken.sub);
        localStorage.setItem('userId', UserId);

        const Roles = decodedToken.roles;
        localStorage.setItem('role', JSON.stringify(Roles));

        const username = getUsername(decodedToken.sub);
        localStorage.setItem('username', username);

        return "Token decoded and declared";
    } catch (e) {
        console.error(e);
    }


    function getUserId(sub) {
        if (!sub || !sub.includes('::')) {
            return null;
        }
        return sub.split('::')[0];
    }

    function getUsername(sub) {
        if (!sub || !sub.includes('::')) {
            return null;
        }
        return sub.split('::')[1];
    }
}

export default decodeTokenAndDeclare;
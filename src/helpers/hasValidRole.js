const hasValidRole = (roles) => {
    const allowedRoles = ["ROLE_ADMIN","ROLE_LIBRARY_STAFF"];
    const rolesAray = Array.isArray(roles) ? roles : [roles];

    return rolesAray.some(role => allowedRoles.includes(role));
}

export default hasValidRole;
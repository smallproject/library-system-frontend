function hasValidRole(roles) {

    const allowedRoles = ["ROLE_ADMIN", "ROLE_LIBRARY_STAFF"];

    const rolesArray = Array.isArray(roles) ? roles : roles.split(",");

    const isValid = rolesArray.some(role => allowedRoles.includes(role.trim()));

    return isValid;
}

export default hasValidRole;
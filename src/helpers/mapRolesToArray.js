function mapRolesToArray(roles) {
    const roleMapping = {
        user: "ROLE_USER",
        admin: "ROLE_ADMIN",
        libraryStaff: "ROLE_LIBRARY_STAFF",
    };

    const activeRoles = Object.entries(roles)
        .filter(([_, isActive]) => isActive)
        .map(([role]) => roleMapping[role]);

    return activeRoles;
}

export default mapRolesToArray;
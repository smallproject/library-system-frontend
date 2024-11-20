function getFullname(firstname, middlename, lastname) {
    if (middlename) {
        return `${firstname} ${middlename} ${lastname}`;
    }
    return `${firstname} ${lastname}`;
}

export {getFullname};


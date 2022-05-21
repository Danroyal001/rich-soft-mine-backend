import userRoles from "../collections/UserRoles";

const getUserRoles = async () => {
    return (await userRoles()).find().toArray();
};

export default getUserRoles;

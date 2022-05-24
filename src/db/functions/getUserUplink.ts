import { ObjectId } from "mongodb";
import getUserByID from "./getUserByID";

const getUserUplink = async (user_id: string | ObjectId) => {
    const user = await getUserByID(new ObjectId(user_id));
    const uplink = await getUserByID(user?.uplinkID!);

    return uplink!;
};

export default getUserUplink;

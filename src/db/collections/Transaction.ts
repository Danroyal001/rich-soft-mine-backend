import dbConnection from "../dbConnection";
import Transaction from "../Schemas/Transaction";

const transactions = async () => {
    const { db } = await dbConnection();
    return db.collection<Transaction>('users');
}

export default transactions;

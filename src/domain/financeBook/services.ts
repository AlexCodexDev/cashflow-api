import * as DAO from "./dao.js"

export const GetAllFinanceBookServices = async () => {
    const data = await DAO.GetAllFinanceBookDAO();
    return data;
}
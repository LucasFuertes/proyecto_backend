import AdminDAO from "../dao/mongo/admin.dao.js";

const adminDAO = new AdminDAO();

export const loginTemporalAdmin = async (data) => {
  try {
    const createAdmin = await adminDAO.create(data);
    const dataAdmin = createAdmin.pop();
    const admin = await adminDAO.findById(dataAdmin._id);
    if (!admin) return false;
    return admin.toObject();
  } catch {
    return false;
  }
};

export const deleteAdmin = async () => {};

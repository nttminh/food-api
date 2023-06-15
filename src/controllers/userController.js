import { Sequelize } from 'sequelize';
import { errorCode, successCode } from '../config/response.js';
import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';

const models = initModels(sequelize);

// Op
const Op = Sequelize.Op;
const getNguoiDung = async (req, res) => {
    try {
        // sự dụng các hàm truy vấn data của sequelize
        // SELECT * FROM food WHERE food_name LIKE '%a%';
        let data = await models.users.findAll({
            // include: ["user_id_users_orders"]
        });


        // localhost:8080/api/user/get-nguoi-dung
        successCode(res, data, "Lấy dữ liệu thành công")
    }
    catch (err) {
        errorCode(res, "Lỗi BE: ")
    }
};
// Create
const createNguoiDung = async (req, res) => {
    try {
        // client data request body
        let { full_name, email, pass_word, } = req.body;

        // await Food_Type.findAll({where})

        let newData = {
            full_name,
            email,
            pass_word,
        };

        // INSERT INTO food VALUES ()
        await models.user.create(newData);

        res.status(200).send("Thêm mới thành công");
    } catch {
        res.status(500).send("Lỗi BE")
    }
}
// Update
const updateNguoiDung = async (req, res) => {
    try {
        let { user_id } = req.params;
        // client data request body
        let { full_name, email, pass_word, } = req.body;

        await models.user.update({
            full_name,
            email,
            pass_word,
        }, { where: { user_id } })
        res.status(200).send("Cập nhật thành công")
    } catch {
        res.status(500).send("Lỗi BE")
    }

}
// Delete
const removeNguoiDung = async (req, res) => {
    try {

        let { user_id } = req.params;
        // check tồn tại
        // [{},{},{}]
        // {}
        let checkFood = await models.user.findAll({ where: { user_id } });
        if (checkFood.length > 0) {
            // DELETE FROM food WHERE user_id = 12;
            await models.user.destroy({ where: { user_id } })
            res.status(200).send("Xóa thành công")
        } else {
            res.status(404).send("Item không tồn tại")
        }


    }
    catch {
        res.status(500).send("Lỗi BE")
    }
}

const getUserPage = async (req, res) => {
    let { page, pageSize } = req.params;
    let index = (page - 1) * pageSize;

    let data = await models.users.findAll({
        offset: index,
        limit: Number(pageSize)
    })

    successCode(res, data, "Truy xuất thành công")
}

export {
    createNguoiDung, getNguoiDung, getUserPage, removeNguoiDung, updateNguoiDung
};


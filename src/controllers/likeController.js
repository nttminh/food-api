import { errorCode, successCode } from '../config/response.js';
import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';
const models = initModels(sequelize);

// Create
const like = async (req, res) => {
    try {
        // client data request body
        let { user_id, res_id } = req.body;
        console.log(user_id, res_id)

        // await Food_Type.findAll({where})

        let newData = {
            user_id: user_id,
            res_id: res_id,
            date_like: new Date().toDateString()
        };

        let isExisted = await models.like_res.findOne({
            where: {
                res_id,
                user_id
            }
        })

        if (isExisted) throw "Người dùng này đã like rồi"

        // INSERT INTO food VALUES ()
        await models.like_res.create(newData);

        successCode(res, newData, "Like thành công");
    } catch (err) {
        errorCode(res, err)
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

export { getUserPage, like, removeNguoiDung, updateNguoiDung };


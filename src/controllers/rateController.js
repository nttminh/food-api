import { errorCode, successCode } from '../config/response.js';
import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';
const models = initModels(sequelize);

const createRating = async (req, res) => {
    try {
        // client data request body
        let { user_id, res_id, amount } = req.body;

        let newData = {
            user_id,
            res_id,
            amount,
            date_rate: new Date().toDateString()
        };

        let isExisted = await models.rate_res.findOne({
            where: {
                user_id,
                res_id
            }
        })

        if (isExisted) throw "Người dùng đã đánh giá nhà hàng này rồi"

        await models.rate_res.create(newData);

        successCode(res, newData, "Đánh giá thành công");
    } catch (err) {
        errorCode(res, err)
    }
}
// Update
// const updateNguoiDung = async (req, res) => {
//     try {
//         let { user_id } = req.params;
//         // client data request body
//         let { full_name, email, pass_word, } = req.body;

//         await models.user.update({
//             full_name,
//             email,
//             pass_word,
//         }, { where: { user_id } })
//         res.status(200).send("Cập nhật thành công")
//     } catch {
//         res.status(500).send("Lỗi BE")
//     }

// }
// Delete
const removeLike = async (req, res) => {
    try {

        let { user_id, res_id } = req.params;
        console.log(user_id, res_id)

        let checkLikes = await models.like_res.findAll({ where: { user_id, res_id } });

        console.log(checkLikes)

        if (checkLikes.length > 0) {
            // DELETE FROM food WHERE user_id = 12;
            await models.like_res.destroy({ where: { user_id, res_id } })
            res.status(200).send("Xóa like thành công")
        } else {
            res.status(404).send("Người dùng chưa từng like nhà hàng này")
        }


    }
    catch {
        res.status(500).send("Lỗi BE")
    }
}

const getLikesByRestaurant = async (req, res) => {
    try {
        let { res_id } = req.params;
        let { page, pageSize } = req.query;

        if (!page) { page = 1 }
        if (!pageSize) { pageSize = 10 }

        let index = (page - 1) * pageSize;

        let data = await models.restaurant.findAll({
            where: {
                res_id
            },
            include: ["like_res"],
            // group: "res_id",
            // attributes: ["res_id", [sequelize.fn("COUNT", sequelize.col("res_id")), "CountLikes"]],
            offset: index,
            limit: Number(pageSize)
        })

        if (data.length === 0) {
            throw "Nhà hàng không tồn tại"
        }

        successCode(res, data, "Truy xuất thành công")
    } catch (error) {
        errorCode(res, error)
    }
}

const getLikesByUser = async (req, res) => {
    try {
        let { user_id } = req.params;
        let { page, pageSize } = req.query;

        if (!page) { page = 1 }
        if (!pageSize) { pageSize = 10 }

        let index = (page - 1) * pageSize;

        let data = await models.users.findAll({
            where: {
                user_id
            },
            include: ["like_res"],
            // group: "res_id",
            // attributes: ["res_id", [sequelize.fn("COUNT", sequelize.col("res_id")), "CountLikes"]],
            offset: index,
            limit: Number(pageSize)
        })

        if (data.length === 0) {
            throw "Người dùng không tồn tại"
        }

        successCode(res, data, "Truy xuất thành công")
    }
    catch (error) {
        errorCode(res, error)
    }
}

export { createRating, getLikesByUser, removeLike };


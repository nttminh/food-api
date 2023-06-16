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

const getLikesByRestaurants = async (req, res) => {
    let { page, pageSize, res_id } = req.params;
    
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

    successCode(res, data, "Truy xuất thành công")
}

const getLikesByUsers = async (req, res) => {
    let { page, pageSize } = req.params;

    if (!page) { page = 1 }
    if (!pageSize) { pageSize = 10 }

    let index = (page - 1) * pageSize;

    let data = await models.like_res.findAll({
        include: ["user"],
        // group: "res_id",
        // attributes: ["res_id", [sequelize.fn("COUNT", sequelize.col("res_id")), "CountLikes"]],
        offset: index,
        limit: Number(pageSize)
    })

    successCode(res, data, "Truy xuất thành công")
}

export { getLikesByRestaurants, like, removeLike };


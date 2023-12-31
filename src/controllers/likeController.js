import { errorCode, successCode } from '../config/response.js';
import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';
const models = initModels(sequelize);

// Create
const like = async (req, res) => {
    try {
        // client data request body
        let { user_id, res_id } = req.body;

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

        await models.like_res.create(newData);

        successCode(res, newData, "Like thành công");
    } catch (err) {
        errorCode(res, err)
    }
}

const removeLike = async (req, res) => {
    try {

        let { user_id, res_id } = req.params;
        console.log(user_id, res_id)

        let checkLikes = await models.like_res.findAll({ where: { user_id, res_id } });

        console.log(checkLikes)

        if (checkLikes.length > 0) {
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

export { getLikesByRestaurant, getLikesByUser, like, removeLike };


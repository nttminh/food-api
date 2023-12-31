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

const getRatesByRestaurant = async (req, res) => {
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
            include: ["rate_res"],
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

const getRatesByUser = async (req, res) => {
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
            include: ["rate_res"],
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

export { createRating, getRatesByRestaurant, getRatesByUser };


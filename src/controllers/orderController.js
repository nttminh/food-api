import { errorCode, successCode } from '../config/response.js';
import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';
const models = initModels(sequelize);

// Create
const createOrder = async (req, res) => {
    try {
        // client data request body
        let { user_id, food_id, amount, code, arr_sub_id } = req.body;

        let newData = {
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id
        };

        let isUserActive = await models.users.findOne({
            where: { user_id }
        })

        let isFoodActive = await models.food.findOne({
            where: { food_id }
        })

        let isExisted = await models.orders.findOne({
            where: {
                user_id,
                food_id
            }
        })

        if (isExisted) throw "Người dùng này đã đặt món này rồi"
        if (!isFoodActive) throw "Món ăn không tồn tại"
        if (!isUserActive) throw "Người dùng không tồn tại"

        await models.orders.create(newData);

        successCode(res, newData, "Đặt hàng thành công");
    } catch (err) {
        errorCode(res, err)
    }
}

export { createOrder };


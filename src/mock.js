//引入mockjs
const Mock = require('mockjs')

//使用mockjs模拟数据
// Mock.mock(/\/api\/v1\/children\/\S+\/snap\/\S+\/qr-code/, (req, res) => {
//     return {
//         code: 0,
//         status:200,
//         data: [{
//           name: 'xxx'
//         }]
//     }
// })
const classList =  Mock.mock('/', {
    status: 200,
    exception: "",
    code: 0,
    message: "",
    data: {
        items: []
    }
});

export default {classList};
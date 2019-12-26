import request from '@/utils/request';

/* 个人资料  */
export function getUserInfo() {
  return request('/personal/home')
}

/** 提交认证资料 */
export function postUserInfo(args) {
  // let params = {
  //   identity_auth: "", // 认证的身份 2=>机构负责人,4=>教练,7=>机构负责人+教练
  //   real_name: "",
  //   club_tel: "",
  //   club_name: "",
  //   city: "",
  //   province: "",
  //   area: "",
  //   address: "",
  //   img_exemption: "", //	免责声明图片
  //   img_work: "", // 工作证明(教练证书)
  //   img_license: "" // 营业执照
  // }
  // params = Object.assign({}, params, args)
  // return request.post('/personal/home', params)
  return request.post('/personal/home', args)
}

/* 现金券使用记录 */
export function getUsedRecord(id) {
  return request(`/personal/home/${id}`)
}

/* 修改提现银行卡 */
export function postChangeBankCard(args) {
  let params = {
    bank_card: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/changeBankCard`, params)
}

/* 获取银行卡信息 */
export function getBankCardInfo() {
  return request(`/personal/getBankCardInfo`)
}

/* 用户充值 */
export function postRecharge(args) {
  let params = {
    num: "", // 充值金额
    payment: "", // 支付方式
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/recharge`, params)
}

/* 用户修改资料 */
export function postUpdateInfo(args) {

  let params = {
    name: "", //
    real_name: "", //
    sex: "", // 性别1-女 2-男 3-保密
    birthday: "",
    city: "",
    province: "",
    area: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/updateInfo`, params)
}

/** 机构资料 */
export function getClubInfo() {
  return request(`/personal/clubInfo`)
}
/** 机构资料 */
export function getMyShare() {
  return request(`/personal/myShare`)
}
/** 认证机构负责人修改机构资料 */

export function postUpdateClubInfo(args) {
  let params = {
    id: "", // 机构id
    name: "",
    tel: "",
    club_tel: "",
    club_name: "",
    club_address: "",
    city: "",
    province: "",
    area: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/updateClubInfo`, params)
}

/** 教练信息 */
export function getTeacherInfo() {
  return request(`/personal/teacherInfo`)
}

/** 更新教练信息 */
export function postUpdateTeacherInfo(args) {
  let params = {
    id: "", // 机构id
    info: "",
    city: "",
    province: "",
    area: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/updateTeacherInfo`, params)
}

/** 充值记录 */
export function getRechargeRecord() {
  return request(`/personal/rechargeRecord`)
}

/** 积分记录 */
export function getFractioRecord() {
  return request(`/personal/fractioRecord`)
}

/** 我的发布 */
export function getMyTrain(page_num = 1) {
  return request(`/personal/myTrain?page=${page_num}`)
}

/** 发布未通过 */
export function getMyTrainFailed(page_num = 1) {
  return request(`/personal/myTrainFailed?page=${page_num}`)
}

/** 提交课程信息 */
export function postMytrainInfoPut(args) {
  let params = {
    main: "", // 内容介绍
    crowd: "", // 	适用人群
    outline: "", // 课程大纲
    tel: "", // 报名联系人电话
    linkman: "", // 报名联系人
    endTime: "",
    startTime: "",
    teacher_img: "",
    name: "",
    address: "",
    area: "",
    city: "",
    province: "",
    price: "",
    diff: "",
    theme: "",
    img_train_three: "",
    img_train_two: "",
    img_train_first: "",
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/mytrainInfoPut`, params)
}

/** 课程信息更新 */
export function postTrainInfoUpdate(args) {
  let params = {
    id: "",
    main: "", // 内容介绍
    crowd: "", // 	适用人群
    outline: "", // 课程大纲
    tel: "", // 报名联系人电话
    linkman: "", // 报名联系人
    endTime: "",
    startTime: "",
    teacher_img: "",
    name: "",
    address: "",
    area: "",
    city: "",
    province: "",
    price: "",
    diff: "",
    theme: "",
    img_train_three: "",
    img_train_two: "",
    img_train_first: "",
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/trainInfoUpdate`, params)
}

/** 教师模糊查询 */
export function postShowTeacherPic(args) {
  let params = {
    name: "", // 
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/showTeacherPic`, params)
}
/** 我的培训信息详情 */
export function getShowMyTrain(id) {
  return request.get(`/personal/showMyTrain/${id}`)
}
/** 我的点赞 */
export function getTeacherThumbsUp() {
  return request.get(`/personal/teacherThumbsUp`)
}
/** 我的培训信息关注 */
export function getMyFollowTrain() {
  return request.get(`/personal/myFollowTrain`)
}
/** 关注培训信息(我想学) */
export function getFollowTrain(id = '') {
  return request.get(`/personal/followTrain/${id}`)
}
/** 给老师点赞 */
export function postThumbsUp(id = '') {
  return request.post(`/teachers/thumbsUp`, { id })
}
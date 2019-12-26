import request from '@/utils/request';

/* 培训信息列表 */
export function getTrains(page = 1) {
  return request(`/trains?page=${page}`)
}
/* 培训信息列表 */
export function postTrainsList(page = 1, args) {
  let params = {
    startTime: "",
    endTime: "",
    minPrice: "",
    maxPrice: "",
    province: "",
    city: "",
    area: "",
    diff: "", // 难度,整数,小于10
    course_type_id: [], // 瑜伽类型,数组传参且数组元素必须是正整数(数组元素是瑜伽类型的id)
  }
  params = Object.assign({}, params, args)
  return request.post(`/trains?page=${page}`, params)
}
/* 最新最热 */
export function getOrderByTrains() {
  return request('/orderByTrains')
}

/** 培训信息筛选 */
export function postTrains(args) {
  let params = {
    startTime: "",
    endTime: "",
    minPrice: "",
    maxPrice: "",
    province: "",
    city: "",
    area: "",
    diff: "", // 难度,整数,小于10
    course_type_id: [], // 瑜伽类型,数组传参且数组元素必须是正整数(数组元素是瑜伽类型的id)
  }
  params = Object.assign({}, params, args)
  return request.post('/trains', params)
}

export function postTrainsRank(page=2, args) {
  let params = {

  }
  params = Object.assign({}, params, args)
  return request.post(`/trains?page=${page}`, params)
}

/* 培训信息详情 */
export function getTrainsById(id) {
  return request(`/trains/${id}`)
}


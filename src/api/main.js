import request from '@/utils/request';
import vm from '../main'
// 网页首页
export function getMainDetail() {
  return request.get(`/home/wap`)
}

export function goAdvertingApi (mold, relation_id) {
  if(mold === 2) { vm.$router.push(`/teacherClub/clubhouseDetails?id=${relation_id}`) }
  else if(mold === 3) {vm.$router.push(`teacherClub/teacherDetails?id=${relation_id}`)}
  else if(mold === 4) { vm.$router.push(`/messagedetail/${relation_id}`) }
  // else if(mold === 5) { vm.$router.push(`/goods/detail/${relation_id}`) }
  else if(mold === 6) { vm.$router.push(`/yogamessage/list/?id=${relation_id}`)} // 
  // else if(mold === 7) { 商品分类 }
  else if(mold === 1) { vm.$router.push(`/advertisement?id=${relation_id}`) }
}

/*# 根级别的 mutation*/
export default {
    SET_TujianInfo: (state, params) => { // 赋值图鉴路由信息
        state.tujianInfo = params
    },
    SET_ArticleInfo: (state, params) => { // 赋值文章路由信息
        state.articleInfo = params
    },
    SET_ShuxiInfo: (state, params) => { // 赋值文章路由信息
        state.shuxiInfo = params
    }
}
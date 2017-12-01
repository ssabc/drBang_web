/**
* 缓存的查询条件
*/
export let localStorage = {
    get: function(key){
        let info = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        return info;
    },
    set: function(key, info){
        if(this.get(key)){
            this.delete(key);
        }
        localStorage.setItem(key, JSON.stringify(info));
    },
    delete: function(key){
        localStorage.removeItem(key);
    }
}

/**
* 获取LocalStorage里的信息
*/
export function getLocalStorageInfo () {
    let info = judgeLoginOut();
    return info.loginInfo;
}

/**
* 当缓存数据不存在时，强制退出到登录页面
* @callback 回调函数
* @routerObjectValue 值获取
*/
export function judgeLoginOut(callback, routerObjectValue){
    // let loginInfo = localStorage.getItem('GT_LOGININFO');
    let cookie = Cookie.get("userName") || '';
    // 登录超时
    if(cookie == '') {
        if(callback){
            callback();
        }else{
            window.vueRouter.push("/login");
        }
        return {userName: ''};
    }else{
        return {userName: cookie}
    }
}

export let Cookie = {
    set: function (name, value) {
        var d = new Date; 
        d.setTime(d.getTime() + 8*60*60*1000); // 8个小时过期
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },

    get: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(name, '', -1);
    }
}
/**
* 删除所有的缓存信息
*/
export function deleteAllCache() {
    // 删除登录信息
    localStorage.delete("GT_LOGININFO");
    // 删除业务缓存的查询条件
    localStorage.delete("GT_CACHESEARCHINFO");
    // 删除Cookie信息
    Cookie.delete("userName");
}
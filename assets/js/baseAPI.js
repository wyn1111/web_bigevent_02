// 开发环境
var baseURL = 'http://api-breakingnews-web.itheima.net'
// 在发送$.get() $.post() $.ajax() 之前会调用
$.ajaxPrefilter(function(options){
    // 获取到ajax多有的参数信息
    // 1. 添加根路径
    options.url = baseURL + options.url

    // 2. 身份认证
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3. 登录拦截（不登录，不允许访问其他页面）
    options.complete = function(res){
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message == '身份认证失败！'){
             //1. 清空本地token
             localStorage.removeItem('token')
             // 2. 页面跳转
             location.href = '/login.html'
        }
    }

})
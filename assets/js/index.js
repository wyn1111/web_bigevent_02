$(function(){
    // 获取用户信息
    getUserInfo()

    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //1. 清空本地token
            localStorage.removeItem('token')
            // 2. 页面跳转
            location.href = '/login.html'
            // 3. 关闭询问框
            layer.close(index);
          });
    })
})


// 获取用户信息函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            // 渲染头像
            renderAvatar(res.data)

        }


    })
}

// 渲染函数
function renderAvatar(user){
    // 1. 渲染名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if(user.user_pic !== null){
        // 有头像
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}
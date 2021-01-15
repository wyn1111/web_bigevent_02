$(function(){
    // 注册/登录 切换点击
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6-12位，且不能输入空格'
        ],
        // 确认密码规则
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return "两次密码输入不一致"
            }
        }
    })

    // 注册功能
    var layer = layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res){
                if(res.status !=0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 跳转到登录
                $('#link_login').click()
                // 重置注册表单
                $('#form_reg')[0].reset()
            }
        })
    })

    // 登录功能
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你登陆成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })




})



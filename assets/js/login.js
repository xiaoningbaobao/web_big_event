$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登陆的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verfiy
    form.verify({
        //自定义一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验密码是否一样
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })


    //监听注册表单的提交时间
    var data = 
    $('#form_reg').on('submit', function (e) {
        e.preventDefault() //阻止表单的默认提交行为
        $.post('http://www.liulongbin.top:3007/api/reguser', {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录')
                //点击后跳转到登陆页面
                $('#link_login').click()
            })

    })


    //监听登陆表单的提交事件
    $('#form_login').submit(function(e) {
        //阻止默认提交的行为
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                //将登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                location.href = '/index.html'//跳转到新的页面
            }

        })
        })


    })

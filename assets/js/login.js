$(function () {
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 引入form 模块
    const form = layui.form;
    // 自定义检验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致
        repwd: (value) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果不一致，提示信息
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return "两次密码不一致"
        }
    })

    // 设置baseUrl
    // const baseUrl = `http://www.liulongbin.top:3007`;

    // 注册功能
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败！');
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // serialize()直接获取form表单内的内容
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登录失败！');
                layer.msg("登录成功！");
                // 登录成功后需要把token令牌放到本地
                localStorage.setItem('token', res.token);
                // 跳转主页
                location.href = '/index.html'
            }
        })
    })
})
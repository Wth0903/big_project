// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: '',
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: res => {
            if (res.status !== 0) return layer.msg('获取用户信息失败');
            layer.msg('获取用户信息成功');
            renderAvatar(res.data);
        },
        complete: res => {
            console.log(res);
        }
    })
}

// 渲染用户信息
const renderAvatar = user => {
    // console.log(user);
    let uname = user.nickname || user.username;
    // 渲染欢迎语
    $('#welcome').html(`欢迎 ${uname}`);
    // 按需要渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        $('.text-avatar').html(uname[0].toUpperCase());
    }
}

//退出
$('#btnlogout').click(() => {
    layer.confirm('是否退出?', { icon: 3, title: "提示" }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
    })
})
getUserInfo();

function change() {
    $('#change').attr('class', 'layui-this').next().attr('class', '')
}
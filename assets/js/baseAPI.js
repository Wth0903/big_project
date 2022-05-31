// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    option.url = `http://www.liulongbin.top:3007` + option.url;
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }

    // 每次发送请求回来校验token是否存在，或者是否过期
    option.complete = res => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.跳转登陆页面
            location.href = '/login.html';
        }
    }
});
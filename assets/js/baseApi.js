//每次调用$.get或$.post,或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数调用完之后，可以拿到我们的ajax提供的内置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007'+ options.url
})
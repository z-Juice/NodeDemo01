var search = location.search;
var id = search.substr(search.indexOf('=') + 1);

// 根据详情id 查询评论数据
initData();

//发表评论
$('#btnSend').click(function(){
    
    var data = $('#frm').serialize();
    
    $.ajax({
        type: "post",
        url: "/blog/addblog",
        data: data,
        dataType: 'json'
    }).then(function(data) {
        if(data.code == 10000) {
            
            initData();
            
            layer.msg(data.msg);
            
        }else{
            layer.msg(data.msg, function(){
                //关闭后的操作
            });
        }
    }, function(){
        console.log('服务器出错了');
    });
    
    return false;
})

function initData() {
    $.ajax({
      type: 'get',
      url: '/getcomments/' + id,
      dataType: 'json'
    })
    .then(function(data) {
      
      if(data && data.length > 0) {
        var html = template('tpl', {data: data});
        $('#comments').html(html);
      }else{
        $('#comments').html('暂无评论，赶紧来坐沙发');
      }
      
    }, function() {
      console.log('服务器出错了')
    })
}
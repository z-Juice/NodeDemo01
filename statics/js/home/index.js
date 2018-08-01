//当前页码
var pageindex = 1;
//上一页
$('.previous > a').click(function() {
  if(pageindex > 1) {
    pageindex--;
    //获取数据
    $.ajax({
      type: 'get',
      url: '/getpagedatas/' + pageindex,
      dataType: 'json'
    })
    .then(function(data) {
      var html = template('tpl', {data: data.data});
      $('#posts').html(html);
    })
  }

  return;
})

//下一页
$('.next > a').click(function() {
  $.ajax({
    type: 'get',
    url: '/getpagecount',
    dataType: 'json'
  })
  .then(function(data) {
    //先发送一次ajax请求，获取总页数
    if(pageindex < data.pagecount) {
      //如果当前不是最后一页，再次发送请求，获取下一页数据
      pageindex++;
      $.ajax({
        type: 'get',
        url: '/getpagedatas/' + pageindex,
        dataType: 'json'
      })
      .then(function(data) {
        if(data.data.length > 0) {
          var html = template('tpl', {data: data.data})
          $('#posts').html(html);
        }
      })
    }
  })

  return;
})
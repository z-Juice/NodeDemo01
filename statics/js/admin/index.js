//显示正在加载
layer.load();

//初始化数据
initData();

//渲染列表
function initData() {
    $.ajax({
        type: 'get',
        url: '/admin/users',
        dataType: 'json'
    })
    .then(function (data) {
      //关闭正在加载
      layer.closeAll('loading');

      var html = template('tpl', { data: data });
      $('#tbody').html(html);

      //给删除按钮注册事件
      attachDelete();

      //给编辑按钮注册事件
      attachEdit();

    }, function () {
      console.log('服务器端出错');
    })
}

//给删除按钮绑定事件
function attachDelete() {
  
  $('.del').click(function () {

    var that = this;

    layer.msg('你确定要删除么？', {
      time: 0 //不自动关闭
      , btn: ['确定', '取消']
      , yes: function (index) {
        layer.close(index);

        var userid = $(that).parent().attr('userid');

        $.ajax({
          type: 'get',
          url: '/admin/users/delete/' + userid,
          dataType: 'json'
        })
        .then(function (data) {
            if (data.code === 10000) {
              layer.msg(data.msg);
              //重新渲染列表
              initData();

            } else {
              layer.msg(data.msg, function () {

              });
            }
        }, function () {
            console.log('服务器出错了');
        })
      }
    });
  })
}

//给编辑按钮绑定事件
function attachEdit() {
  
  $('.edit').click(function() {
    //添加=0
    flag = 0;
    
    //弹出层
    $('.modal').modal('show');
    $('.modal-title').text('修改用户');
    //获取用户id
    var id = $(this).parent().attr('userid');
    
    //给弹出层的隐藏域赋值，--为了实现修改功能
    $('#id').val(id);

    $.ajax({
      type: 'get',
      url: '/admin/users/' + id,
      dataType: 'json'
    })
    .then(function(data) {
        //把数据显示到文本框中
        // $('#username').val(data.username);
        // $('#nickname').val(data.nickname);
        // $('#email').val(data.email);

        for(var key in data) {
          if(key === 'password') continue;
          $('#' + key).val(data[key]);
        }

    }, function() {
        layer.msg('服务器出错了', function() {

        });
    })

  })
}

//添加用户弹出框
$('#addBtn').click(function() {
  //添加=1
  flag = 1;
  
  $('.modal').modal('show');
  $('.modal-title').text('添加用户');
})

//判断是添加还是修改
//默认-1  
//添加 1
//修改 0
var flag = -1;

//提交添加\编辑用户
$('#addSave').click(function() {
  //表单验证  验证用户输入是否合法

  //获取表单数据
  var data = $('#frm').serialize();
  
  //表单验证  验证用户输入是否合法
  var url = '';
  if(flag === 1) {
    //添加
    url = '/admin/users/add';
  }else if(flag === 0) {
    //修改
    url = '/admin/users/edit';
  }

  $.ajax({
    type: 'post',
    url: url,
    data: data,
    dataType: 'json'
  })
  .then(function(data) {
    if(data.code === 10000) {
      //添加成功
      layer.msg(data.msg);
      //关闭层
      $('.modal').modal('hide');
      //重新渲染
      initData();
      
    }else{
      layer.msg(data.msg, function() {

      })
    }
  }, function() {
    console.log('服务器错误');
  })
})

//当模态窗口关闭后，清空文本框
$('.modal').on('hide.bs.modal', function() {
  //清空文本框
  $('#frm input[type=text]').val('');
  $('#frm input[type=password]').val('');
  $('#frm input[type=email]').val('');
  
})
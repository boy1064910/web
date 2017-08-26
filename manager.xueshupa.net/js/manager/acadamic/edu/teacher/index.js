var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'head',
    title: '头像',
    align: 'center',
    formatter: function(value,row,index){
        return '<img width="30" src="'+value+'" />';
    }
});
columns.push({
    field: 'account',
    title: '账号/手机号',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '教师名称',
    align: 'center'
});
columns.push({
    field: 'idNumber',
    title: '身份证号码',
    align: 'center'
});
columns.push({
    field: 'graduateSchool',
    title: '毕业院校',
    align: 'center'
});
columns.push({
    field: 'eduBackGround',
    title: '学历',
    align: 'center'
});
columns.push({
    field: 'degree',
    title: '学位',
    align: 'center'
});
columns.push({
    field: 'schoolAge',
    title: '教龄',
    align: 'center'
});
columns.push({
    field: 'rateName',
    title: '学术葩评级',
    align: 'center'
});
columns.push({
    field: 'status',
    title: '状态',
    align: 'center',
    formatter : function(value,row,index){
        if(value==-1){
            return '<font color="red">认证不通过</font>';
        }
        else if(value==0){
            return '<font color="grey">待认证</font>';
        }
        else{
            return '<font color="green">已认证</font>';   
        }
    }
});
columns.push({
    field: 'requestTime',
    title: '申请时间',
    align: 'center',
    formatter: function(value,row,index){
        if($.isEmpty(value)) return '';
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'enrollTime',
    title: '认证时间',
    align: 'center',
    formatter: function(value,row,index){
        if($.isEmpty(value)) return '';
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'status',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '';

        if(value==-1){
            
        }
        else if(value==0){
            result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="信息认证">信息认证</a>';
        }
        else{
            result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
        }

        return result;
    }
});

Ding.ready(function(){
    //请求商品表格数据
    $("#dataTable").bootstrapTable({
        //请求方法
        method: 'get',
        // toolbar:'#toolbar',
         //是否显示行间隔色
        striped: true,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
        cache: false,    
        //是否显示分页（*）  
        pagination: true,   
        //是否启用排序  
        sortable: false,    
        //排序方式 
        sortOrder: "asc",    
        //初始化加载第一页，默认第一页
        pageNumber:1,   
        //每页的记录行数（*）   
        pageSize: 50,  
        //可供选择的每页的行数（*）    
        pageList: [20, 50, 150, 300],
        showRefresh:false,
        showToggle:false,
        singleSelect: false,
        //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
        url: projectName+"/manager/acadamic/edu/teacher/pageInfo.shtml",
        //查询参数,每次调用是会带上这个参数，可自定义
        queryParams : function(params) {
            return {
                currentIndex : params.offset + 1,
                pageSize : params.limit
            };
        },
        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,  
        // formatSearch:function(){
        //     return '买手店名称';
        // },
        // searchOnEnterKey:true,
        idField : "id",
        uniqueId: "id",
        columns: columns,
        // detailFormatter:function(index, row){
        //     console.log(row);
        // },
        onLoadSuccess:function(result){
            commonResultCallback(result);
        }
    });
});


function initEdit(id,index){
    $("#index").val(index);
    Ding.ajax({
        'url' : projectName + '/manager/acadamic/edu/teacher/initEdit.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            var teacher = data.teacher;
            $("#name").val(teacher.name);
            $("#idNumber").val(teacher.idNumber);
            $("#graduateSchool").val(teacher.graduateSchool);
            $("#eduBackGround").val(teacher.eduBackGround);
            $("#degree").val(teacher.degree);
            $("#experience").val(teacher.experience);
            $("#characteristic").val(teacher.characteristic);
            $("#schoolAge").val(teacher.schoolAge);
            $("#rateName").val(teacher.rateName);
            $("#id").val(teacher.id);
            $("#head").attr("src",data.head);
            var title = '';
            if(data.status==0){
                D("#editForm").action = projectName+"/manager/acadamic/edu/teacher/approveTeacher.shtml";
                D("#editForm").successCallback = "approveSuccess";
                openModal({
                    'title':'教师信息认证',
                    'targetId':'editForm',
                    'sureBtnText':'认证通过'
                });
            }
            else if(data.status==1){
                D("#editForm").action = projectName+"/manager/acadamic/edu/teacher/updateTeacher.shtml";
                D("#editForm").successCallback = "updateSuccess";
                openModal({
                    'title':'教师信息编辑',
                    'targetId':'editForm',
                    'sureBtnText':'保存'
                });
            }
            
        }
    });
}   

function approveSuccess(result){
    var data = result.data;
    var temRow = $("#dataTable").bootstrapTable('getRowByUniqueId',data.id);
    data['head'] = temRow.head;
    data['status'] = 1;
    $("#dataTable").bootstrapTable('updateRow',{
        'index' : $("#index").val(),
        'row' : data
    });
}

function updateSuccess(result){
    var data = result.data;
    var temRow = $("#dataTable").bootstrapTable('getRowByUniqueId',data.id);
    data['head'] = temRow.head;
    data['status'] = temRow.status;
    $("#dataTable").bootstrapTable('updateRow',{
        'index' : $("#index").val(),
        'row' : data
    });
}
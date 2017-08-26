var aRandomCode = 'CourseAudit';
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'teacherName',
    title: '授课老师',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '课程内容',
    align: 'center'
});
columns.push({
    field: 'startDate',
    title: '开课时间',
    align: 'center',
    formatter: function(value,row,index){
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'endDate',
    title: '结课时间',
    align: 'center',
    formatter: function(value,row,index){
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'times',
    title: '课程时长',
    align: 'center',
    formatter: function(value,row,index){
        return value+"个小时";
    }
});
columns.push({
    field: 'submitTime',
    title: '提审时间',
    align: 'center',
    formatter: function(value,row,index){
        return Ding.formatDate(new Date(value),'%Y-%M-%d %H:%m');
    }
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '<a href="javascript:void(0)" onclick="initAudit('+row.id+')" title="审核">审核</a>';
        return result;
    }
});

Ding.ready(function(){
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
        url: projectName+"/manager/data/pageInfo.shtml",
        //查询参数,每次调用是会带上这个参数，可自定义
        queryParams : function(params) {
            return {
                currentIndex : params.offset + 1,
                pageSize : params.limit,
                aRandomCode : aRandomCode
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


function initAudit(id){
    this.location = projectName + '/manager/acadamic/edu/course/audit/initAudit.shtml?id='+id;
}
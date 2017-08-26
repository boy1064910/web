var columns = [];

columns.push({
    field: 'firstCategoryName',
    title: '课程类别',
    align: 'center',
    formatter:function(value,row,index){
        return value+" - "+row.secondCategoryName
    }
});
columns.push({
    field: 'courseStyle',
    title: '课程类型',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '课程',
    align: 'center'
});
columns.push({
    field: 'teacherName',
    title: '老师',
    align: 'center'
});

columns.push({
    field: 'price',
    title: '费用（￥）',
    align: 'center'
});
columns.push({
    field: 'minCount',
    title: '开班人数',
    align: 'center',
    formatter:function(value,row,index){
        return value+" ~ "+row.maxCount
    }
});
columns.push({
    field: 'startDate',
    title: '开课时间',
    align: 'center',
    formatter:function(value,row,index){
        return Ding.formatDate(new Date(value));
    }
});
columns.push({
    field: 'endDate',
    title: '结课时间',
    align: 'center',
    formatter:function(value,row,index){
        return Ding.formatDate(new Date(value));
    }
});
columns.push({
    title: '课时',
    align: 'center',
    formatter:function(value,row,index){
        var detailList = row.detailList;
        var times = 0;
        for(var i=0;i<detailList.length;i++){
            times += detailList[i].times;
        }
        return times+"小时";
    }
});
columns.push({
    field: 'enrollCount',
    title: '报名人数',
    align: 'center'
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
        url: projectName+"/manager/index/coursePageInfo.shtml",
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
        detailView: true,
        detailFormatter:function(index, row){
            console.log(row);
            var detailList = row.detailList;
            var result = '<table>'
                +'<tr>'
                +'<th>课时</th>'
                +'<th>课程内容</th>'
                +'<th>上课时间</th>'
                +'<th>课程时长</th>'
                +'<th>教室地址</th>'
                +'</tr>';

            for(var i=0;i<detailList.length;i++){
                var detail = detailList[i];
                result += '<tr>'
                    +'<td>第'+(i+1)+'课时</td>'
                    +'<td>'+detail.info+'</td>'
                    +'<td>'+Ding.formatDate(new Date(detail.startTime),'%Y-%M-%d %H:%m')+' ~ '+Ding.formatDate(new Date(detail.endTime),'%Y-%M-%d %H:%m')+'</td>'
                    +'<td>'+detail.times+'小时</td>'
                    +'<td>'+detail.address+detail.roomInfo+detail.classRoomName+'</td>'
                    +'</tr>';
            }
            result += '</table>';
            return result;
        },
        onLoadSuccess:function(result){
            commonResultCallback(result);
        }
    });
});
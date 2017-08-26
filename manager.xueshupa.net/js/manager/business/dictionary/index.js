var aRandomCode = 'BusinessDictionary';
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'keyCode',
    title: '字典代码',
    align: 'center'
});
columns.push({
    field: 'remark',
    title: '字典备注',
    align: 'center'
});
columns.push({
    title: '字典值数据',
    align: 'center',
    formatter:function(value,row,index){
        var result = "";
        if(!$.isEmpty(row.detailList)){
            var detailList = row.detailList;
            result += detailList[0].value;
            if(row.detailList.length>1){
                for(var i=1;i<detailList.length;i++){
                    result += " | "+detailList[i].value;
                }
            }
            
        }
        return result;
    }
});
columns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑">编辑</a>';
        result+='<a href="javascript:void(0)" onclick="initDelete('+row.id+')" title="删除">删除</a>';
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
        pagination: false,   
        //是否启用排序  
        sortable: false,    
        //排序方式 
        sortOrder: "asc",    
        //初始化加载第一页，默认第一页
        // pageNumber:1,   
        // //每页的记录行数（*）   
        // pageSize: 50,  
        // //可供选择的每页的行数（*）    
        // pageList: [20, 50, 150, 300],
        // showRefresh:true,
        // showToggle:true,
        singleSelect: false,
        //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
        // url: projectName+"/manager/business/dictionary/list.shtml",
        //查询参数,每次调用是会带上这个参数，可自定义
        // queryParams : function(params) {
        //     return {
        //         currentIndex : params.offset + 1,
        //         pageSize : params.limit,
        //         aRandomCode : aRandomCode
        //     };
        // },
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
        columns: columns
        // detailFormatter:function(index, row){
        //     console.log(row);
        // },
        // onLoadSuccess:function(result){
        //     commonResultCallback(result);
        // }
    });

    loadData();
});

function loadData(){
    Ding.ajax({
        'url' : projectName+"/manager/business/dictionary/list.shtml",
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#dataTable").bootstrapTable('load',data);
        }
    })
}

function initAdd(){
    openModal({
        'title':'添加字典数据',
        'targetId':'addForm',
        'sureBtnText':'保存'
    });
}

function initAddDetail(btn){
    var parent = $(btn).parents(".common-after");
    var copyDetail = $(parent).clone();
    $(parent).parent().append(copyDetail);
    copyDetail.find("#btnDiv").empty();
    copyDetail.find("#btnDiv").append('<button class="btn btn-danger" type="button" onclick="deleteDetail(this)"><i class="fa fa-minus"></i></button>');
    copyDetail.find("[name='values']").val('');
    copyDetail.find("[name='ids']").val('');
}

function deleteDetail(btn,id){
    $(btn).parent().parent().remove();
    if(!$.isEmpty(id)){
        var val = $("#deleteIds").val()+id+",";
        $("#deleteIds").val(val);
    }
}

function insertSuccess(result){
    $("#dataTable").bootstrapTable('append',result.data);
}

function initEdit(id,index){
    var children = $("#editForm").find(".common-after").parent().children();    
    for(var i=1;i<children.length;i++){
        $(children[i]).remove();
    }
    $("#deleteIds").val('');
    $("#index").val(index);
    Ding.ajax({
        'url' : projectName + '/manager/business/dictionary/initEdit.shtml',
        'params' : {
            'id' : id
        },
        'successCallback' : function(result){
            var data = result.data;
            $("#editForm").find("[name='keyCode']").val(data.keyCode);
            $("#editForm").find("[name='remark']").val(data.remark);
            $("#editForm").find("[name='id']").val(data.id);
            var detailList = data.detailList;
            $("#editForm").find("[name='values']").val(detailList[0].value);
            $("#editForm").find("[name='ids']").val(detailList[0].id);
            if(detailList.length>1){
                for(var i=1;i<detailList.length;i++){
                    var copyDetail = $(children[0]).clone();
                    $(children[0]).parent().append(copyDetail);
                    copyDetail.find("[name='values']").val(detailList[i].value);
                    copyDetail.find("[name='ids']").val(detailList[i].id);
                    copyDetail.find("#btnDiv").empty();
                    copyDetail.find("#btnDiv").append('<button class="btn btn-danger" type="button" onclick="deleteDetail(this,'+detailList[i].id+')"><i class="fa fa-minus"></i></button>');
                }
            }

            openModal({
                'title':'编辑字典数据',
                'targetId':'editForm',
                'sureBtnText':'保存'
            });
        }
    });
}   

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除字典',
        content: '删除字典后相关业务将引用不到该字典数据，是否删除 !',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/business/dictionary/deleteDictionary.shtml?id='+id,
                'successCallback':function(result){
                    $("#dataTable").bootstrapTable('removeByUniqueId',id);
                }
            });
        }
    });
}

function updateSuccess(result){
    $("#dataTable").bootstrapTable('updateRow',{
        'index' : $("#index").val(),
        'row' : result.data
    });
}
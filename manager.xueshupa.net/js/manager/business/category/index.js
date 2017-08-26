var firstCategoryColumns = [];
firstCategoryColumns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
firstCategoryColumns.push({
    field: 'name',
    title: '分类名称',
    align: 'center'
}); 
firstCategoryColumns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = "";
        var editBtn = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+',1)" title="编辑"><i class="glyphicon glyphicon-edit"></i> 编辑</a>';
        var delBtn = '<a href="javascript:void(0)" title="删除" onclick="initDelete('+row.id+',1)"><i class="glyphicon glyphicon-remove"></i> 删除</a>';
        var upBtn = '<a href="javascript:void(0)" title="上移" onclick="exchangeOrderCode('+row.id+',0,'+index+',1)"><i class="fa fa-arrow-up"></i> 上移</a>';
        var downBtn = '<a href="javascript:void(0)" title="下移" onclick="exchangeOrderCode('+row.id+',1,'+index+',1)"><i class="fa fa-arrow-down"></i> 下移</a>';
        var childrenBtn = '<a href="javascript:void(0)" title="配置二级类别" onclick="getSecondCategoryList('+row.id+',\''+row.name+'\')"><i class="fa fa-bars"></i> 展开二级类别</a>';
        result+=editBtn+delBtn+upBtn+downBtn+childrenBtn;
        return result;
    }
});

var secondCategoryColumns = [];
secondCategoryColumns.push({
    field: 'id',
    title: 'ID',
    align: 'center',
    formatter:function(value,row,index){
        var temIndex = index+1;
        return temIndex;
    }
});
secondCategoryColumns.push({
    field: 'name',
    title: '二级品类',
    align: 'center'
}); 
secondCategoryColumns.push({
    field: 'id',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result = "";
        var editBtn = '<a href="javascript:void(0)" onclick="initEdit('+row.id+','+index+')" title="编辑"><i class="glyphicon glyphicon-edit"></i> 编辑</a>';
        var delBtn = '<a href="javascript:void(0)" title="删除" onclick="initDelete('+row.id+',2)"><i class="glyphicon glyphicon-remove"></i> 删除</a>';
        var upBtn = '<a href="javascript:void(0)" title="上移" onclick="exchangeOrderCode('+row.id+',0,'+index+',2)"><i class="fa fa-arrow-up"></i> 上移</a>';
        var downBtn = '<a href="javascript:void(0)" title="下移" onclick="exchangeOrderCode('+row.id+',1,'+index+',2)"><i class="fa fa-arrow-down"></i> 下移</a>';
        result+=editBtn+delBtn+upBtn+downBtn;
        return result;
    }
});
Ding.ready(function(){
	$("#firstCategoryTable").bootstrapTable({
        //请求方法
        method: 'get',
        toolbar:'#ftoolbar',
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
        pageNumber:1,   
        //每页的记录行数（*）   
        pageSize: 50,  
        //可供选择的每页的行数（*）    
        pageList: [20, 50, 150, 300],
        showRefresh:false,
        
        // url : ,
        
        // queryParams : function(params) {
        //     return {
        //         pid:D("#addCategorySelector").val()
        //     };
        // },
        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,  
        idField : "id",
        uniqueId: "id",
        columns: firstCategoryColumns
    });

	$("#secondCategoryTable").bootstrapTable({
        //请求方法
        method: 'get',
        toolbar:'#toolbar',
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
        pageNumber:1,   
        //每页的记录行数（*）   
        pageSize: 50,  
        //可供选择的每页的行数（*）    
        pageList: [20, 50, 150, 300],
        showRefresh:false,
        //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
        // url: projectName+"/business/category/list.shtml",
        // url : ,
        //查询参数,每次调用是会带上这个参数，可自定义
        queryParams : function(params) {
            return {
                pid:D("#addCategorySelector").val()
            };
        },
        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,  
        idField : "id",
        uniqueId: "id",
        columns: secondCategoryColumns
    });

    //默认加载一级品类的table数据
    initFirstCategoryTable();
});

function initFirstCategoryTable(){
    Ding.ajax({
        'url':projectName+'/manager/business/category/list.shtml',
        'params':{
            'pid': 0
        },
        'successCallback':function(result){
            var data = {};
            data.rows = result.data;
            $("#firstCategoryTable").bootstrapTable('load',data);
        }
    })
}

function initAddFirstCategory(){
    $("#pid").val(0);
    $("#name").val('');
    $("#addCategoryForm").attr("successCallback","insertFirstSuccess");
    openModal({
        'targetId':'addCategoryForm',
        'title':'添加一级类别',
        'sureBtnText':'保存'
    });
}

function initAddSecondCategory(){
    var pid = $("#pid").val();
    $("#name").val('');
    $("#addCategoryForm").attr("successCallback","insertSecondSuccess");
    if(pid==0){
        $.alert({
            'title':'学术葩提示',
            'content':'请先点击一级类别的【展开二级类别】',
            'confirmButton':'确定'
        });
    }
    else{
        openModal({
            'title':'添加二级类别信息',
            'targetId':'addCategoryForm',
            'sureBtnText':'保存'
        });
    }
}

function insertFirstSuccess(result){
    $("#firstCategoryTable").bootstrapTable('append',result.data);
}

function insertSecondSuccess(result){
    $("#secondCategoryTable").bootstrapTable('append',result.data);   
}

function getSecondCategoryList(id,name) {
    $("#fCategoryName").html(name);
    Ding.ajax({
        'url':projectName+'/manager/business/category/list.shtml',
        'params':{
            'pid':id
        },
        'successCallback':function(result){
            var data = {};
            data.rows = result.data;
            $("#secondCategoryTable").bootstrapTable('load',data);
            $("#pid").val(id);
        }
    })
}

//删除二级品类
function initDelete(id,level) {
    $.confirm({
        title: '学术葩提示',
        content: '删除该类别关联的数据关系均会解除，删除一级类别二级类别会同时删除，确认删除？',
        confirmButton:'确认',
        cancelButton:'取消',
        confirm: function(){
            Ding.ajax({
                'url' : projectName+"/manager/business/category/deleteCategory.shtml",
                'params' : {
                    'id' : id
                },
                successCallback : function(result) {
                    if(level==1){
                        $("#firstCategoryTable").bootstrapTable('removeByUniqueId',id);
                    }
                    else{
                        $("#secondCategoryTable").bootstrapTable('removeByUniqueId',id);    
                    }
                }
            });
        }
    });
}

function exchangeOrderCode(id,state,index,level){
    Ding.ajax({
        'url':projectName+"/manager/business/category/exchangeOrderCode.shtml",
        'params':{
            'id':id,
            'state':state
        },
        'successCallback':function(result){
            var table;
            if(level==1){
                table = $("#firstCategoryTable");
            }
            else{
                table = $("#secondCategoryTable");
            }
            var data = table.bootstrapTable('getRowByUniqueId',id);
            var nIndex;
            var change = true;
            if(state==0){
                if(index!=0){
                    nIndex = index-1;
                }
                else{
                    change = false;
                }
            }
            else{
                var tableData = table.bootstrapTable('getOptions');
                var tableLength = tableData.data.length;
                if(index<(tableLength-1)){
                    nIndex = index+1;
                }
                else{
                    change = false;
                }
            }
            if(change){
                table.bootstrapTable('removeByUniqueId',id);
                table.bootstrapTable('insertRow',{
                    'index' : nIndex,
                    'row' : data
                });
            }
        }
    })
}

function initEdit(id,index,level){
    $("#editIndex").val(index);
    Ding.ajax({
        'url':projectName+'/manager/business/category/getById.shtml',
        'params':{
            'id':id
        },
        'successCallback':function(result){
            $("#editId").val(result.data.id);
            $("#editName").val(result.data.name);
            if(level==1){
                $("#editCategoryForm").attr("successCallback","updateFirstSuccess");    
            }
            else{
                $("#editCategoryForm").attr("successCallback","updateSecondSuccess");
            }
            openModal({
                'title':'编辑类别信息',
                'targetId':'editCategoryForm',
                'sureBtnText':'保存'
            })
        }
    })
}

function updateFirstSuccess(result){
    var data = {};
    data.row = result.data;
    data.index = $("#editIndex").val();
    $("#firstCategoryTable").bootstrapTable('updateRow',data);
}

function updateSecondSuccess(result){
    var data = {};
    data.row = result.data;
    data.index = $("#editIndex").val();
    $("#secondCategoryTable").bootstrapTable('updateRow',data);
}
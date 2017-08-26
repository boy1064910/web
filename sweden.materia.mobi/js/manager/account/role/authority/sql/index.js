var aRandomCode = 'AccountRoleAuthoritySql';
var columns = [];
columns.push({
    field: 'id',
    title: 'ID',
    align: 'center'
});
columns.push({
    field: 'name',
    title: '权限名称',
    align: 'center'
});
columns.push({
    field: 'url',
    title: '链接地址',
    align: 'center'
});
columns.push({
    field: 'countSql',
    title: '数量SQL',
    align: 'center'
});
columns.push({
    field: 'dataSql',
    title: '数据SQL',
    align: 'center'
});
columns.push({
    field: 'dataSubfixSql',
    title: 'SQL尾缀',
    align: 'center'
});
columns.push({
    title: 'SQL參數',
    align: 'center',
    width: '10%',
    formatter:function(value,row,index){
        if(!$.isEmpty(row.params)){
            var htmler = "";
            for(var i=0;i<row.params.length;i++){
                var param = row.params[i];
                htmler += '<div>'+param.paramsName+':'+param.paramsSql+':'+($.isEmpty(param.countParamSql)?"":param.countParamSql)+'</div>';
            }
            return htmler;
        }
        else{
            return '';
        }
    }
});
columns.push({
    field: 'dataPool',
    title: '数据服务',
    align: 'center',
    formatter : function(value,row,index){
        switch(value){
            case 'account':{
                return '账号资源服务';
            }
            case 'sweden':{
                return '瑞典商旅服务';
            }
            default:{
                if($.isEmpty(value)){
                    return '<font color="red">尚未配置</font>';
                }
                else{
                    return '未知服务';
                }
            }
        }
    }
});
columns.push({
    field: 'id',
    width: '120px',
    title: '操作',
    align: 'center',
    formatter:function(value,row,index){
        var result='<a href="javascript:void(0)" onclick="initConfigSql('+row.id+','+row.roleAuthoritySqlId+','+index+')" title="配置">配置</a>';
        result +='<a href="javascript:void(0)" onclick="initDelete('+row.roleAuthoritySqlId+')" title="删除配置">删除配置</a>';
        result += '<a href="javascript:void(0)" onclick="syncOnline('+row.id+')" title="同步线上">同步线上</a>';
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
        // url: projectName+"/manager/data/pageInfo.shtml",
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
        'url' : projectName+'/manager/account/role/authority/sql/list.shtml',
        'params' : {
            'roleId' : $("#roleId").val()
        },
        'successCallback' : function(result){
            var data = {};
            data.rows = result.data;
            $("#dataTable").bootstrapTable('load',data);
        }
    })
}

function initConfigSql(id,roleAuthoritySqlId,index){
    $("#index").val(index);
    $("#paramsDiv").empty();
    $("#countSql").val('');
    $("#dataSql").val('');
    $("#authorityHashId").val(id);
    $("#id").val('');
    if($.isEmpty(roleAuthoritySqlId)){//尚未配置SQL语句

    }
    else{//编辑
        Ding.ajax({
            'url' : projectName + '/manager/account/role/authority/sql/getRoleAuthoritySqlById.shtml',
            'params' : {
                'id' : roleAuthoritySqlId
            },
            'successCallback' : function(result){
                var data = result.data;
                $("#dataSql").val(data.dataSql);
                $("#countSql").val(data.countSql);
                $("#dataSubfixSql").val(data.dataSubfixSql);
                $("#dataPool").val(data.dataPool);
                var roleAuthoritySqlParamList = data.roleAuthoritySqlParamList;
                if(!Ding.isEmpty(roleAuthoritySqlParamList)){
                    for(var i=0;i<roleAuthoritySqlParamList.length;i++){
                        var param = roleAuthoritySqlParamList[i];
                        var paramDiv = $('<div class="sql_params_div"></div>');
                        var paramsSign = $(
                                '<input type="hidden" name="editParamIds" value="'+param.id+'" />'
                                +'<div class="radio"><label><input type="radio" radioName="editSigns" name="editSigns'+param.id+'" value="0">内部參數</label>'
                                +'<label style="margin-left:18px;"><input type="radio" radioName="editSigns" name="editSigns'+param.id+'" value="1">外部參數</label></div>'     
                            );
                        paramsSign.find('input[value='+param.sign+']').attr("checked","checked");
                        var delBtn = $('<button class="btn btn-danger" type="button" onclick="delParam(this,'+param.id+')"><i class="fa fa-times"><i></button>');
                        paramsSign.append(delBtn);
                        var paramNameInput = $('<input type="text" class="form-control" placeholder="參數名稱" value="'+param.paramsName+'" name="editParamNames" inputType="name" />');
                        var paramNameSql = $('<input type="text" class="form-control" placeholder="参数SQL" value="'+param.paramsSql+'" inputname="editParamSqls" inputType="sql" />');
                        var countParamNameSql = $('<input type="text" class="form-control" placeholder="数量查询参数SQL" value="'+($.isEmpty(param.countParamSql)?"":param.countParamSql)+'" inputname="editCountParamSqls" inputType="countParamSql" />');
                        paramDiv.append(paramsSign).append(paramNameInput).append(paramNameSql).append(countParamNameSql);
                        $("#paramsDiv").append(paramDiv);
                    }
                }
            }
        });
    }

    openModal({
        'title':'配置SQL信息',
        'targetId':'form',
        'sureBtnText':'保存'
    });
}

function submitValidation(){
    var signArray = [];
    var editSignArray = []; 
    var signs = $("input[type='radio'][radioName='signs']");
    for(var i=0;i<signs.length;i++){
        if($(signs[i])[0].checked){
            signArray.push($(signs[i]).val());
        }
    }
    
    var editSigns = $("input[radioName='editSigns']");
    for(var i=0;i<editSigns.length;i++){
        if($(editSigns[i])[0].checked){
            editSignArray.push($(editSigns[i]).val());
        }
    }
    
    var paramNameArray = [];
    var paramNames = $("input[name='paramNames']");
    for(var i=0;i<paramNames.length;i++){
        paramNameArray.push($(paramNames[i]).val().replaceAll(",","`"));
    }
    
    var paramSqlArray = [];
    var paramSqls = $("input[inputname='paramSqls']");
    for(var i=0;i<paramSqls.length;i++){
        paramSqlArray.push($(paramSqls[i]).val().replaceAll(",","`"));
    }
    
    var countParamSqlArray = [];
    var countParamSqls = $("input[inputname='countParamSqls']");
    for(var i=0;i<paramSqls.length;i++){
        countParamSqlArray.push($(countParamSqls[i]).val().replaceAll(",","`"));
    }
    
    var editParamIdArray = [];
    var editParamIds = $("input[name='editParamIds']");
    for(var i=0;i<editParamIds.length;i++){
        editParamIdArray.push($(editParamIds[i]).val().replaceAll(",","`"));
    }
    
    var editParamNameArray = [];
    var editParamNames = $("input[name='editParamNames']");
    for(var i=0;i<editParamNames.length;i++){
        editParamNameArray.push($(editParamNames[i]).val().replaceAll(",","`"));
    }
    
    var editParamSqlArray = [];
    var editParamSqls = $('input[inputname="editParamSqls"]');
    for(var i=0;i<editParamSqls.length;i++){
        editParamSqlArray.push($(editParamSqls[i]).val().replaceAll(",","`"));
    }

    var editCountParamSqlArray = [];
    var editCountParamSqls = $('input[inputname="editCountParamSqls"]');
    for(var i=0;i<editCountParamSqls.length;i++){
        editCountParamSqlArray.push($(editCountParamSqls[i]).val().replaceAll(",","`"));
    }
    
    D("#form").submitParams = {
        'signs':signArray,
        'editSigns':editSignArray,
        'paramNames':paramNameArray,
        'paramSqls':paramSqlArray,
        'countParamSqls':countParamSqlArray,
        'editParamIds':editParamIdArray,
        'editParamNames':editParamNameArray,
        'editParamSqls':editParamSqlArray,
        'editCountParamSqls':editCountParamSqlArray
    };
    return true;
}

function updateSuccess(result){
    loadData();
}

var index = 0;
function addParams(){
    var paramDiv = $('<div class="sql_params_div"></div>');
    var paramsSign = $(
            '<div class="radio"><label><input type="radio" radioName="signs" name="signs'+index+'" value="0" checked>内部參數</label>'
            +'<label><input type="radio" radioName="signs" name="signs'+index+'" value="1">外部參數</label></div>'      
        );
    var delBtn = $('<button class="btn btn-danger" type="button" onclick="delParam(this)"><i class="fa fa-times"><i></button>');
    paramsSign.append(delBtn);
    var paramNameInput = $('<input type="text" class="form-control" placeholder="參數名稱" name="paramNames" inputType="name" />');
    var paramNameSql = $('<input type="text" class="form-control" placeholder="参数SQL" inputname="paramSqls" inputType="sql" />');
    var countParamSql = $('<input type="text" class="form-control" placeholder="数量查询参数SQL" inputname="countParamSqls" inputType="countParamSql" />');
    paramDiv.append(paramsSign).append(paramNameInput).append(paramNameSql).append(countParamSql);
    $("#paramsDiv").append(paramDiv);
    index++;
}

function delParam(btn,id){
    if(!Ding.isEmpty(id)){
        $("#paramsDiv").before('<input type="hidden" name="delParamIds" value="'+id+'" />');
    }
    $(btn).parent().parent().remove();
}

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

function syncOnline(id){
    $.alert({
        title:'学术葩提示',
        content: '【学术葩】尚未部署线上服务器',
        confirmButton:'确定'
    });
}

function copySuccess(){
    D("#onlineRoleId").reset();
    $("#onlineAuthorityId").val('');
}

function initDelete(id){
    $.confirm({
        backgroundDismiss: true,
        title:'删除功能',
        content: '是否删除角色权限配置信息 !',
        confirmButton:'删除',
        cancelButton:'取消',
        confirmButtonClass:'btn-success',
        confirm:function(){
            Ding.ajax({
                'url':projectName+'/manager/account/role/authority/sql/deleteById.shtml',
                'params':{
                    'id' : id
                },
                'method':'post',
                'successCallback':function(result){
                    loadData();
                }
            });
        }
    });
}
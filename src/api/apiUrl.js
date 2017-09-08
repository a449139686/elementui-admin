global.ApiUrl = {};

global.ApiSignKey = 'vue-admin@#!';

//global.ApiUrl.baseUlr = 'http://admin.phalcon.com';

global.ApiUrl.baseUlr = 'https://admin.fastgoo.net';

//global.ApiUrl.baseUlr = 'http://admin.phalcon.com';

/** 微信扫描登录授权接口 */
global.ApiUrl.authLogin = '/admin.api/admin_base/authLogin';
/** 注册账号 */
global.ApiUrl.register = '/admin.api/admin_base/register';
/** 登录账号 */
global.ApiUrl.login = '/admin.api/admin_base/login';
/** 验证token接口 */
global.ApiUrl.authCeck = '/admin.api/admin_base/authCheck';
/** 修改管理员密码接口 */
global.ApiUrl.updatePassword = '/admin.api/admin_base/updatePassword';
/** 上传图片 */
global.ApiUrl.uploadFile = '/public/upload/file';
/** 删除图片 */
global.ApiUrl.deleteFile = '/public/upload/delete';

/* 好友申请设置列表 */
global.ApiUrl.friendRequestList = '/admin.api/friend_request/lists';
/* 好友申请设置添加 */
global.ApiUrl.friendRequestAdd = '/admin.api/friend_request/add';
/* 好友申请设置删除 */
global.ApiUrl.friendRequestDelete = '/admin.api/friend_request/delete';

/* 好友指令列表 */
global.ApiUrl.friendCommandList = '/admin.api/friend_command/lists';
/* 好友指令添加 */
global.ApiUrl.friendCommandAdd = '/admin.api/friend_command/add';
/* 好友指令删除 */
global.ApiUrl.friendCommandDelete = '/admin.api/friend_command/delete';

/* 群组指令列表 */
global.ApiUrl.groupCommandList = '/admin.api/group_command/lists';
/* 群组指令添加 */
global.ApiUrl.groupCommandAdd = '/admin.api/group_command/add';
/* 群组指令删除 */
global.ApiUrl.groupCommandDelete = '/admin.api/group_command/delete';

/* 群组列表 */
global.ApiUrl.groupListList = '/admin.api/group_list/lists';
/* 群组添加 */
global.ApiUrl.groupListAdd = '/admin.api/group_list/add';
/* 群组删除 */
global.ApiUrl.groupListDelete = '/admin.api/group_list/delete';

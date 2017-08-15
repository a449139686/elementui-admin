global.ApiUrl = {};

global.ApiSignKey = 'vue-admin@#!';

global.ApiUrl.baseUlr = 'http://admin.phalcon.com';

//global.ApiUrl.baseUlr = 'https://admin.fastgoo.net';

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

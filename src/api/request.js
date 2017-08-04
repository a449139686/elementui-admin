/**
 * Created by Mr.Zhou on 2017/8/3.
 */
export default{
    install(Vue){
        Vue.prototype.postData = function (url, data, successCall) {
            console.log(url);
            if(!this.isUrl(url)){
                url = ApiUrl + url;
            }
            console.log(url);

            var time = new Date().getTime();
            time = Math.floor(time / 1000);
            function getSignStr(obj) {
                var str = "";
                var keys = [];
                for (var key in obj) {
                    keys.push(key);
                    if (typeof obj[key] == 'string') {
                        obj[key] = obj[key].replace(/\s+/g, "");
                    }
                }
                keys.sort();
                $.each(keys, function (index, value) {
                    var nn = obj[value];
                    if (typeof nn == 'object') {
                        $.each(nn, function (k, v) {
                            str += value + "[" + k + "]=" + v + "&";
                        })
                    } else {
                        str += value + "=" + nn + "&";
                    }
                });
                str += "appKey=" + ApiSignKey + "&timestamp=" + time;
                return md5(str).toUpperCase();
            };

            var sign = getSignStr(data);
            var postData = JSON.parse(JSON.stringify(data));
            postData.sign = sign;
            postData.timestamp = time;
            var self = this;
            this.$http({
                method: 'POST',
                url: url,
                body: postData,
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            }).then(function (response) {
                if (response.status == 200) {
                    if(response.data.code == -401){
                        VueEvent.$message({
                            message:'用户信息已失效，即将跳转到登录页面',
                            type:'error',
                            onClose:function () {
                                self.$router.push('/login');
                            }
                        });
                    }else{
                        successCall(response.data);
                    }
                } else {
                    VueEvent.$message.error('哎呀，服务器好像出错了');
                }
            }, function (response) {
                VueEvent.$message.error('哎呀，服务器好像崩溃了');
            });
        };
        Vue.prototype.isUrl = function (str) {
            if(str != ""){
                var reg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                if(!reg.test(str)){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}

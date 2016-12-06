/**
 * Created by LiYonglei on 2016/12/6.
 * 通过传入的格式解析传入的日期时间字符串，
 * 该方法是为了解析一些不标准的日期时间字符串，比如 yyyy-MM-dd hh:mm:ss,
 * 只支持ISO8061格式中的year, month, day, hour, minute, second,
 * 必须要注意的是传入的dateString一定是表示的是本地时间而不是UTC(国际标准化时间),
 * 若要解析UTC时间或者能够确定dateString是标准的日期时间字符串格式请直接使用 new Date(dateString)
 */
if(!Date.prototype.parseByFormat){
    Date.parseByFormat=function(dateString,format){
        var properties=[/yyyy|yy/,/MM|M/,/dd|d/,/hh|h/,/mm|m/,/ss|s/].map(function(reg,idx){
            var exec = reg.exec(format);
            if(!exec){
                return 0;
            };
            var property = +dateString.substring(exec.index,exec.index+exec[0].length);
            switch (idx){
                case 0:
                    if(!Math.floor(property/100)){
                        return Math.floor(new Date().getFullYear()/100)*100+property;
                    };
                    break;
                case 1:
                    return property-1;
            }
            return property;
        });
        return new Date(properties[0],properties[1],properties[2],properties[3],properties[4],properties[5]);
    }
};
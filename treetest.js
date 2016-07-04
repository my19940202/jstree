/**
 * 关于无限分类的js功能的测试
 * Sun Jul 03 2016 11:29:35 GMT+0800 (CST)
 */
var a = {
    name: 'human',
    subcategory: []
};
var tpl = {
    name: '',
    subcategory: []
};
tpl.name = '11111';
a.subcategory.push(deepCopy(tpl));

tpl.name = '222';
tpl = deepCopy(tpl);
a.subcategory[0].subcategory.push(tpl);
console.log(a);
// var randomName = ['11','222'];
// var function deepcate (argument) {
//      // body...  
// }
// for (var i = 0; i < 6; i++) {
//     // 赋值一下
    
// }


function deepCopy(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
        if (typeof source[key]==='object') {
            if (source[key] instanceof Array) {
                result[key] = source[key];
            }
            else {
                result[key] = deepCopy(source[key]);
            }
        }
    } 
    return result;
}


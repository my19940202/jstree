var a = {
    name: 'country',
    depth: 0,
    subcategory: [
        {
            name: 'china',
            depth: 1,
            subcategory: [
                {
                    name: '浙江',
                    depth: 2,
                    subcategory: [
                        {name: '温州', depth: 3, subcategory: []},
                        {name: '杭州', depth: 3, subcategory: [
                            {name: '江干', depth: 4, subcategory: []},
                            {name: '西湖', depth: 4, subcategory: []},
                            {name: '拱墅', depth: 4, subcategory: []},
                            {name: '余杭', depth: 4, subcategory: []},
                        ]}
                    ]
                },
                {
                    name: '安徽', depth: 2, subcategory: []
                }
            ]
        },
        {
            name: 'Japan',
            depth: 1,
            subcategory: [
                {
                    name: 'Tokyo',
                    depth: 2,
                    subcategory: []
                }
            ]
        },
        {
            name: '韩国',
            depth: 1,
            subcategory: [
                {
                    name: '首尔',
                    depth: 2,
                    subcategory: [
                        {
                            name: '东大门',
                            depth: 3,
                            subcategory: []
                        },
                        {
                            name: '西大门',
                            depth: 3,
                            subcategory: []
                        }
                    ]
                }
            ]
        }
    ]
};

var b = {
    name: 'country',
    depth: 0,
    subcategory: [
        {
            name: 'Japan',
            depth: 1,
            subcategory: [
                {
                    name: 'Tokyo',
                    depth: 2,
                    subcategory: []
                }
            ]
        },
        {
            name: '韩国',
            depth: 1,
            subcategory: [
                {
                    name: '首尔',
                    depth: 2,
                    subcategory: [
                        {
                            name: '东大门',
                            depth: 3,
                            subcategory: []
                        },
                        {
                            name: '西大门',
                            depth: 3,
                            subcategory: []
                        }
                    ]
                }
            ]
        }
    ]
};

// 深拷贝赋值
var deep = function (source) {
    var result = {};
    for (var key in source) {
        if (typeof source[key]==='object') {
            if (source[key] instanceof Array && source[key].length > 0) {
                result[key] = source[key].slice(0, source[key].length);
            }
            else {
                result[key] = deep(source[key]);
            }
        }

        if (typeof source[key] === 'string') {
            result[key] = source[key];
            console.log(source[key]);
        }
    }
    return result;
};

// 这个遍历应该是没有问题 但是有一点是 不去清楚每个值所在的深度
var deepsearch1 = function (source) {
    for (var key in source) {
        if (typeof source[key] === 'object') {
            if (source[key] instanceof Array && source[key].length > 0) {
                for (var i = 0; i < source[key].length; i++) {
                    deepsearch1(source[key][i]);
                }
            }
            else if (!(source[key] instanceof Array)) {
                deepsearch1(source[key]);
            }
        }
        else if (typeof source[key] === 'string') {
            var prefix = new Array(source['depth']);
            prefix = prefix.join('\t');
            console.log(prefix + source[key]);
        }
    }
    // depth++;
};

// 继续优化这个函数生成有层次结构的 ul li html片段
var _html = '';
var deepsearchHtml = function (source) {
    _html += '<ul>';
    for (var key in source) {
        if (typeof source[key] === 'object') {
            if (source[key] instanceof Array && source[key].length > 0) {
                for (var i = 0; i < source[key].length; i++) {
                    deepsearchHtml(source[key][i]);
                }
            }
            else if (!(source[key] instanceof Array)) {
                deepsearchHtml(source[key]);
            }
        }
        else if (typeof source[key] === 'string') {
            var prefix = new Array(source['depth']);
            prefix = prefix.join('\t');
            // console.log('<li>', source[key], '</li>');
            var tmpStr = '<li>'+ source[key] + '</li>';
            _html += tmpStr;
        }
    }
    _html += '</ul>';
};


// var b = deep(a);
// a.subcategory[1]['name'] = 'afdsafds';
deepsearch1(a);

deepsearchHtml(a);
document.getElementById('table').innerHTML = _html;

// 事件绑定
var clickLi = $('li');
var liArr = [];
for (var i = 0; i < clickLi.length; i++) {
    if ($(clickLi[i]).siblings().length >= 1) {
        liArr.push(clickLi[i]);
    }
}

// console.log(liArr);
for (var i = 0; i < liArr.length; i++) {
    $(liArr[i]).click(function () {
        // sub tree
        var sub_tree = $(this).siblings();
        sub_tree.toggle();

    });
}

// 后面还应该实现关于这样结构的增删改差的实现


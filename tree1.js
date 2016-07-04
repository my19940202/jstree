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
var deepsearch = function (source) {
    for (var key in source) {
        if (typeof source[key] === 'object') {
            if (source[key] instanceof Array && source[key].length > 0) {
                for (var i = 0; i < source[key].length; i++) {
                    deepsearch(source[key][i]);
                }
            }
            else if (!(source[key] instanceof Array)) {
                deepsearch(source[key]);
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


// var b = deep(a);
// a.subcategory[1]['name'] = 'afdsafds';
// console.log(a, b);
deepsearch(a);

// 后面还应该实现关于这样结构的增删改差的实现
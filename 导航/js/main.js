//初始化键盘数据
var hashInit = init();
var keys = hashInit['keys'];
var urls = hashInit['urls'];

//创建键盘及相应事件
creatKeyboard();

document.onkeypress = function (event) {
    var key = event['key'];//取得按键的字母
    window.open("https://www." + urls[key], "_blank");
}
function init() {
    var keys = {
        0: { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
        1: { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
        2: { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
        length: 3
    }

    var urls = {
        q: 'qq.com', w: 'weibo.com', e: 'ebay.com', r: '', t: 'tianya.cn', y: '', u: '', i: 'imooc.com', o: '', p: '',
        a: 'amazon.com', s: 'stackoverflow.com', d: '', f: '', g: 'github.com', h: '', j: 'jianshu.com', k: '', l: '',
        z: 'zhihu.com', x: '', c: 'csdn.net', v: '', b: 'bilibili.com', n: '', m: 'mcdonalds.com.cn'
    }
    urls = getStorage('aaa', urls);
    return {
        'keys': keys,
        'urls': urls
    }
}
function creatKeyboard(){
    for (var index1 = 0; index1 < keys.length; index1++) {
        var div = creatTag('div');//创建一个div 标签  
        for (var index2 = 0; index2 < keys[index1].length; index2++) {
            var kbd = creatTag('kbd');//创建一个kdb标签 
            kbd.className = 'kbdStyle';
    
            var span = creatTag('span');//创建一个span标签
            span.textContent = keys[index1][index2];//设置span标签的内容
    
            var img = creatTag('img');//创建img标签
            if (!urls[span.textContent] == '') {
                img.src = "https://www." + urls[span.textContent] + "/favicon.ico";
            } else {
                img.src = './img/defined.png';
            }
            img.onerror = function (e) {
                e.target.src = './img/defined.png';
            }
            img.onclick = function (event) {
                var span = event.target.previousSibling;
                window.open('https://www.' + urls[span.textContent], '_blank');
            }
    
            var editButton = creatTag('button');//创建一个button标签
            editButton.textContent = 'Edit';//button命名
            editButton.id = keys[index1][index2];//将button的id设置为按键的字母
            editButton.onclick = function (event) {
                var newUrl = prompt('请输入一个新的网址：');
                var button = event.target;//用id定位所按的button的位置
                urls[button.id] = newUrl;//将新输入的网址覆盖旧网址
                setStorage('aaa', urls);//将输入的信息存储起来
                if (!urls[button.id] == '' && !newUrl == '') {
                    button.previousSibling.src = "https://www." + urls[button.id] + "/favicon.ico";
                } else {
                    button.previousSibling.src = './img/defined.png';
                }
                img.onerror = function (e) {
                    button.previousSibling.src = './img/defined.png';
                }
            }
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(editButton);
            div.appendChild(kbd);//将kbd标签添加到div中
        }
        keyBoard.appendChild(div);//将div标签添加到id为keyBoard的标签里
    }
}
function creatTag(tagName) {
    return document.createElement(tagName);
}
function setStorage(keyName, hash) {
    localStorage.setItem(keyName, JSON.stringify(hash));
}
function getStorage(keyName, hash) {
    var newUrls = JSON.parse(localStorage.getItem(keyName)) || '';
    if (!newUrls == '') {
        hash = newUrls;
    }
    return hash;
}

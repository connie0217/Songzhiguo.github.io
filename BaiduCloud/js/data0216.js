    /**
     * Created by Administrator on 2016/12/30 0030.
     */

    /*
     1.写数据
     2.拿到数据渲染数据
     3.文件夹新建，重命名，删除
     4.鼠标移入改变状态，点击左上角选中，改变状态
     5.重命名，只有一个被选中的时候才可以重命名。弹窗默认是当前文字，
     6.删除，所有勾选的被删除（包括所有有子集），数据别忘记删
     7.右上角，页面有几个文件，显示加载几个文件
     8.全选功能
     9.双击进入子集，面包屑导航
     10.框选，拖拽放入
     */
    //  初始数据
    var data = [
        {
            id: 1,
            name: '秒味课堂',
            pId: 0
        }, {
            id: 2,
            name: '我的应用数据',
            pId: 0
        }, {
            id: 3,
            name: 'HTML5',
            pId: 0
        }
    ];
    var as = document.getElementsByClassName('tools-btn');//新建、重命名、删除
    var gridView = document.getElementsByClassName('grid-view ')[0];//图标视图
    var reName = document.getElementById('reName');//重命名弹窗
    var box = document.getElementsByClassName('box')[0];//重命名input
    var sure = document.getElementsByClassName('sure')[0];//√
    var cancel = document.getElementsByClassName('cancel')[0];//×
    var checkAll = document.getElementById('checkAll');//全选
    var gridViewItems = gridView.children;//所有新建
    var checkboxs = gridView.getElementsByTagName('span');//所有checkbox
    var fileNames = document.getElementsByClassName('file-name');//所有新建名
    var fileAll = document.getElementsByClassName('fileAll')[0];//全部文件
    var historyManager = document.getElementsByClassName('history-manager')[0];//鼠标双击进入显示
    var historyLi = historyManager.getElementsByTagName('li')[1];//鼠标双击进入显示的第二个li
    var disabled = document.getElementsByClassName('disabled')[0];//遮罩层
    var arrSure = [creaSure, renameSure];//把两个确定函数放进数组
    var tipInner = document.getElementById('tip-inner');//提示框
    var tipText = document.getElementsByClassName('tip-text')[0];//提示框文字
    var tipWidth = tipInner.offsetWidth;//提示框自身宽度
    var loadNum = document.getElementsByClassName('load-num')[0];//页面加载数量
    var loadN = 0;//控制加载数量
    var back = document.getElementById('back');//返回上一级
    var all = document.getElementById('all');//返回上一级

    //获取重命名宽高位置
    var asWidth = as[1].offsetWidth;
    var asHeight = as[1].offsetHeight;
    var asLeft = as[1].offsetLeft;
    var asTop = as[1].offsetTop;

    // 双击进入函数
    var arrId = [];//存储双击的ID
    var str = '';//用于设置hash
    var h = null;//截取hash中路径
    var hName = null;//
    var nowPid = 0;//当前pid
    var arrHash = [];//存储hash路径
    var arrData = [];//存储双击过的数据

    var num = data.length;//控制id
    var n = 0;//控制新建文件夹重复后边序号
    var index = null;//知道点击的是新建还是重命名
    var arrChange = [];//放删除的文件夹中的n值
    var createName = '新建文件夹';
    var onOff = true;//全选未选中为true
    var valNum = 1;//重命名后缀
    var isNew = true;//解决连续新建
    var arrChoose = [];
    //右键
    var main = document.getElementById('main');//右键范围层
    var fileMenu = document.getElementById('file-menu');//文件夹右键菜单
    var domMenu = document.getElementById('dom-menu');//空白右键菜单
    var fileLis = fileMenu.getElementsByClassName('item');//文件夹右键菜单中所有li
    var domLis = fileMenu.getElementsByClassName('item');//空白右键菜单中所有li

    //框选
    var pos = {};
    var isDrag = false;//拖拽
    var isRect = false;//框选
    var isDelete = false;
    var boxChoose = document.getElementById('boxChoose');
    var shadow = document.getElementById('shadow');
    var viewMain = document.getElementsByClassName('view-main')[0];
    var isDuang = null;
    var nowId = 0;//当前id

    data.sort(function (a, b) {
        return b.id - a.id;
    });
/*    //渲染数据
    for (var i = 0; i < data.length; i++) {
        create(data[i]);
    }*/
    //  写数据
    function create(info) {
        var gridViewItem = document.createElement('div');
        var fileIcon = document.createElement('div');
        var fileName = document.createElement('div');
        var checkbox = document.createElement('span');
        gridViewItem.className = 'grid-view-item';
        fileIcon.className = 'file-icon';
        fileName.className = 'file-name';
        if (info) {
            fileName.innerHTML = info.name;
        }
        gridViewItem.appendChild(fileIcon);
        gridViewItem.appendChild(fileName);
        gridViewItem.appendChild(checkbox);
        gridView.appendChild(gridViewItem);
        if (info) {
            gridViewItem.num = info.id;
        } else {
            if (data.length){
                gridViewItem.num = data[0].id + 1;
            }
        }
        //鼠标移入改变状态，点击左上角选中，改变状态
        gridViewItem.onmouseover = function () {
            for (var i = 0; i < data.length; i++) {
                if (checkbox.className == '') {
                    this.className += ' back-color-over';
                    checkbox.className = 'checkbox-over';
                }
            }
        };
        gridViewItem.onmouseout = function () {
            for (var i = 0; i < data.length; i++) {
                if (checkbox.className == 'checkbox-over') {
                    this.className = 'grid-view-item';
                    checkbox.className = '';
                }
            }
        };
        checkbox.onclick = function () {
            if (this.className == 'checkbox-over') {
                this.className = 'checkbox-lick';
                gridViewItem.className = 'grid-view-item back-color-lick';
            } else if (this.className == 'checkbox-lick') {
                this.className = 'checkbox-over';
                gridViewItem.className = 'grid-view-item back-color-over';
            }
            isCheck();
        };
        //双击进入子文件夹
        gridViewItem.ondblclick = function () {
            doubleClick(gridViewItem);
        }
    }

    //  新建文件夹
    as[0].onclick = function () {
        if (isNew) {
            isNew = false;
            index = 0;
            create();
            reName.style.display = 'block';
            reName.style.left = '0px';
            box.value = createName;
            box.select();//默认选中input框中的文字
            //把新创建的放在第一位
            if (gridView.children.length >= 2) {
                gridView.insertBefore(gridView.lastElementChild, gridView.firstElementChild);
            }
            isCheck();
        }
    };
    //确定
    sure.onclick = function () {
        isNew = true;
        // 提示框
        tip();
        arrSure[index]();
        //已全部加载，共几个
        loadN = 0;
        for(var i = 0;i<data.length;i++){
            if (data[i].pId == nowPid){
                loadN++;
            }
            loadNum.innerHTML = loadN;
        }
    };
    //提示框函数
    function tip() {
        tipInner.style.marginLeft = -tipWidth / 2;
        tipInner.style.display = 'block';
        setTimeout(function () {
            tipInner.style.display = 'none';
        }, 1000);
    }
    //弹窗延迟消失函数
    function popUp() {
        reName.style.opacity = 0;
        setTimeout(function () {
            reName.style.opacity = 1;
            reName.style.display = '';
        }, 300);
    }
    //取消
    cancel.onclick = function () {
        isNew = true;
        if (index) {
            reName.style.display = '';
        } else {
            reName.style.display = '';
            gridView.removeChild(gridView.children[0]);
        }
    };
    //  全选
    checkAll.onclick = function () {
        if (onOff) {
            this.className = 'check-over';
            for (var i = 0; i < gridViewItems.length; i++) {
                gridViewItems[i].className = 'grid-view-item back-color-lick';
                checkboxs[i].className = 'checkbox-lick';
            }
            disabled.style.width = asWidth + 'px';
            disabled.style.height = asHeight + 'px';
            disabled.style.left = asLeft + 'px';
            disabled.style.top = asTop + 'px';
            onOff = false;
        } else {
            this.className = 'check';
            for (var i = 0; i < gridViewItems.length; i++) {
                gridViewItems[i].className = 'grid-view-item';
                checkboxs[i].className = '';
            }
            disabled.style.width = '';
            disabled.style.height = '';
            disabled.style.left = '';
            disabled.style.top = '';
            onOff = true;
        }
    };

    //  判断全选函数
    function isCheck() {
        var m = 0;
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].className == 'checkbox-lick') {
                m++;
            }
        }
        if (m > 1) {//当选中大于1时，遮罩层显示在重命名的位置，不能点击
            disabled.style.width = asWidth + 'px';
            disabled.style.height = asHeight + 'px';
            disabled.style.left = asLeft + 'px';
            disabled.style.top = asTop + 'px';
        } else if (m < 2) {//当选中小于2时，遮罩层恢复初始
            disabled.style.width = '';
            disabled.style.height = '';
            disabled.style.left = '';
            disabled.style.top = '';
        }
        if (m == checkboxs.length && checkboxs.length != 0) {
            checkAll.className = 'check-over';
            onOff = false;
        } else {
            checkAll.className = 'check';
            onOff = true;
        }
    }

    //  删除
    var deData = [];
    fileLis[2].onclick = as[2].onclick = function () {
        tipText.innerHTML = '删除成功';
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].className == 'checkbox-lick') {
                //删除对应数据
                for (var j = 0; j < data.length; j++) {
                    if (data[j].id == gridViewItems[i].num) {
                        //把删除的放进数组，并从小打到排序
                        var prev = data[i].name.substr(createName.length + 1, 1);
                        if (data[i].name == createName) {
                            arrChange.push(prev);
                        }
                        if (Number(prev) > 1) {
                            arrChange.push(prev);
                        }
                        arrChange.sort(function (a, b) {
                            return a - b;
                        });
                        deData.push(data[j]);
                        deFn(data[j]);
                    }
                }
                // console.log(data);
                //删除对应结构
                gridView.removeChild(checkboxs[i].parentNode);
                i--;
                //提示框
                tip();
                if (typeof Number(prev) == 'number') {
                    n--;
                }
            }
        }
        //删除对应文件数据以及文件内所有数据
        for (var i = 0;i<deData.length;i++){
            for (var j = 0;j<data.length;j++){
                if (deData[i].id == data[j].id){
                    data.splice(j,1);
                }
            }
        }
        console.log(data)
        isCheck();
        //已全部加载，共几个
        loadN = 0;
        for(var i = 0;i<data.length;i++){
            if (data[i].pId == nowPid){
                loadN++;
            }
            console.log(loadN);
            loadNum.innerHTML = loadN;
        }
    };
    //当前文件夹内的所有数据
    function deFn(obj) {
        if (data.some(function (a){return a.pId == obj.id})){
            for (var i = 0;i<data.length;i++){
                if (data[i].pId == obj.id){
                    deData.push(data[i]);
                    return deFn(data[i]);
                }
            }
        }else{
            return;
        }
    }

    //  重命名
    fileLis[1].onclick = as[1].onclick = function () {
        index = 1;
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].className == 'checkbox-lick') {
                reName.style.left = checkboxs[i].parentNode.offsetLeft + 'px';
                reName.style.display = 'block';
                box.value = fileNames[i].innerHTML;
                box.select();
            }
        }
    };
    //新建确定函数
    function creaSure() {
        tipText.innerHTML = '新建成功';
        //判断执行删除数据还是执行n值
        if (arrChange.length) {//如果有删除数据
            if (box.value == createName) {//新建默认值不改变
                //判断删除数组中第一位是不是空字符串，为空执行第一个，否则执行第二个
                if (arrChange[0] == '') {
                    fileNames[0].innerHTML = createName
                } else {
                    fileNames[0].innerHTML = createName + '(' + arrChange[0] + ')';
                }
                //执行过就表示在页面中已经生成了新的数据，后缀为删除数据的第一个，页面中有的话，删除数组中也要删除
                arrChange.splice(0, 1);
            }
        } else {//没有删除或者没有重命名执行
            if (!n) {//初始化新建
                if (box.value != createName) {//新建默认值改变时n值不累计
                    fileNames[0].innerHTML = box.value;//新建文件夹名为修改名字
                    n--;
                } else {//新建文件夹名为默认值
                    fileNames[0].innerHTML = createName;
                }
            } else if (box.value != createName) {//不是初始化新建时，文件名重命名
                fileNames[0].innerHTML = box.value;
                n--;
            } else {//不是初始新建，新建默认值不变
                fileNames[0].innerHTML = createName + '(' + (n + 1) + ')';
            }
        }
        // 每次新建进行n++
        n++;
        num++;
        var j = {};
        j.id = num;//新建文件夹id
        j.name = fileNames[0].innerHTML;
        if (arrId.length) {
            j.pId = arrId[arrId.length - 1];
        } else {
            j.pId = 0;
        }
        data.push(j);
        // console.log(data);
        //弹窗消失
        popUp();
        //每次数据排序按ID从大到小，删除的能与数据同步
        for (var i = 0; i < data.length; i++) {
            data.sort(function (a, b) {
                return b.id - a.id;
            });
        }
    }
    //重命名确定函数
    function renameSure() {
        var arrFile = [];
        var arrEqual = [];
        tipText.innerHTML = '重命名成功';
        //循环所有checkboxs
        for (var i = 0; i < checkboxs.length; i++) {
            //拿到被选中的checkbox
            if (checkboxs[i].className == 'checkbox-lick') {
                //判断是重命名有没有改变，哪一个文件夹名改变
                if (fileNames[i].innerHTML != box.value) {
                    gridViewItems[i].className = 'grid-view-item';
                    checkboxs[i].className = '';
                    //弹窗消失
                    popUp();
                    //把重命名的后缀记录放进数组
                    var prev = fileNames[i].innerHTML.substr(createName.length + 1, 1);
                    if (fileNames[i].innerHTML == createName) {
                        arrChange.push(prev);
                    }
                    if (Number(prev) > 1) {
                        arrChange.push(prev);
                    }
                    arrChange.sort(function (a, b) {
                        return a - b;
                    });
                    for (var j = 0; j < fileNames.length; j++) {
                        arrFile.push(fileNames[j].innerHTML);
                    }
                    arrFile.splice(i, 1);
                    if (arrFile.some(function (a) {
                            return a == box.value
                        })) {//有重命名的进
                        for (var j = 0; j < arrFile.length; j++) {//循环所有有已有名字
                            if (box.value == arrFile[j].substr(0, box.value.length)) {//前几位相等就进来
                                if (arrFile[j].length == box.value.length + 3) {
                                    if (arrFile[j].substr(box.value.length, 1) == '(') {
                                        if (typeof Number(arrFile[j].substr(box.value.length + 1, 1)) == 'number') {
                                            if (arrFile[j].substr(box.value.length + 2, 1) == ')') {
                                                //进来的都是可以后缀排序的
                                                arrEqual.push(arrFile[j].substr(box.value.length + 1, 1));
                                            }
                                        }
                                    }
                                }
                                console.log(arrEqual);
                                if (box.value == arrFile[j]) {//重命名与已有名字完全相等
                                    valNum++;
                                    if (arrEqual.some(function (a) {
                                            return a == valNum
                                        })) {
                                        for (var k = 0; k < arrEqual.length; k++) {
                                            if (valNum == arrEqual[k]) {
                                                fileNames[i].innerHTML = box.value + '(' + arrEqual[k] + ')';
                                            }
                                        }
                                    } else {
                                        console.log(valNum);
                                        fileNames[i].innerHTML = box.value + '(' + valNum + ')';
                                    }
                                }
                            }
                        }
                    } else {
                        // alert(1)
                        fileNames[i].innerHTML = box.value;
                        data[i].name = fileNames[i].innerHTML;//改变数据中对应的name
                    }
                } else {
                    reName.style.display = '';
                }
            }
        }
    }

    //双击进入函数
    function doubleClick(gridViewItem) {
        // gridView.innerHTML = '';
        fileAll.style.display = 'none';
        historyManager.style.display = 'block';
        //把双击的id 放进arrId数组里
        arrId.push(gridViewItem.num);
        //把双击的数据存进数组里
        for (var i = 0;i<data.length;i++){
            if (gridViewItem.num == data[i].id){
                arrData.push(data[i]);
            }
        }
        //设置hash值
        str += gridViewItem.children[1].innerHTML + '/';
        location.hash = '#path=' + str;
        //把当前的hash值放入数组
        arrHash.push(location.hash);
        //当前pid
        nowPid = gridViewItem.num;
    }
    //生成面包屑导航函数
    function navCreate() {
        //arrId长度大于等于2时，才可以生成a标签，
        if (arrId.length >= 2) {
            for(var i = 0;i<arrId.length-1;i++){
                for(var j = 0;j<data.length;j++){
                    if (data[j].id == arrId[i]){
                        createA(data[j].name);
                    }
                }
            }
        }
        //生成span标签
        var span = document.createElement('span');
        for (var i = 0;i<data.length;i++){
            if (data[i].id == arrId[arrId.length-1]){
                span.innerHTML = data[i].name;
            }
        }
        historyLi.appendChild(span);
    }
    //一条a标签数据
    function createA(strA) {
        var a = document.createElement('a');
        var spanArrow = document.createElement('span');
        a.href = 'javascript:;';
        a.innerHTML = strA;
        spanArrow.className = 'history-manager-separator-arrow';
        spanArrow.innerHTML = '>';
        historyLi.appendChild(a);
        historyLi.appendChild(spanArrow);
        a.onclick = function () {
            // 给a标签设置hash值
            for(var i = 0;i<arrHash.length;i++){
                h = arrHash[i].split('=')[1].split('/');
                hName = h[h.length-2];
                if (a.innerHTML == hName){
                    location.hash = arrHash[i];
                    str = arrHash[i].split('=')[1];
                }
            }
        }
    }

    //返回上一级
    back.onclick = function () {
        //每返回上级，arrHsh删除一位最后值
        arrHash.pop();
        //设置hash值，每次返回hash值取arrHsh中的最后一位
        if (arrHash.length){
            location.hash = arrHash[arrHash.length-1];
        }else {
            //arrHash为空时，location.hash值为空
            location.hash = '';
            fileAll.style.display = 'block';
            historyManager.style.display = '';
        }
    };
    // 全部文件
    all.onclick = function () {
        fileAll.style.display = 'block';
        historyManager.style.display = '';
        location.hash = '';
    };
    // 根据hash值重新渲染页面
    window.onload = window.onhashchange = function () {
        // hash值改变，文件夹列表，面包屑导航清空
        gridView.innerHTML = '';
        historyLi.innerHTML = '';
        if (location.hash == ''){
            //返回第一级时，数据清空
            nowPid = 0;
            arrId = [];
            str = [];
            arrHash = [];
        }else {
            //截取hash路径中最后一个文件名
            h = location.hash.split('=')[1].split('/');
            hName = h[h.length-2];
            //每次根据hash值找到当前pid，arrId根据hash改变跟着改变
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == hName) {
                    nowPid = data[i].id;
                    for (var j = 0;j<arrId.length;j++){
                        if (arrId[j] == data[i].id){
                            arrId.splice(j+1);
                        }
                    }
                }
            }
            //根据当前hash值截取剩下的arrHash，
            for (var i = 0;i<arrHash.length;i++){
                if (arrHash[i] == location.hash){
                    arrHash.splice(i+1);
                }
            }
        }
        //根据hash值重新渲染面包屑导航
        navCreate();
        //根据hash值重新渲染文件夹列表
        loadN = 0;
        for(var i = 0;i<data.length;i++){
            if (data[i].pId == nowPid){
                create(data[i]);
                loadN++;
            }
            loadNum.innerHTML = loadN;
        }
        isCheck();
    };

    // 右键菜单
    main.oncontextmenu = function (ev) {
        //阻止默认行为
        ev.preventDefault();
        var l = ev.clientX;
        var t = ev.clientY;
            if (ev.target.parentNode == gridView || ev.target.parentNode.parentNode == gridView){
                //在文件夹上右键
                fileMenu.style.display = 'block';
                domMenu.style.display = 'none';
                fileMenu.style.left = l + 'px';
                fileMenu.style.top = t + 'px';
            }else {
                // 不在文件加上右键
                domMenu.style.display = 'block';
                fileMenu.style.display = 'none';
                domMenu.style.left = l + 'px';
                domMenu.style.top = t + 'px';
            }
            //在文件夹上右键，选中当前
            for (var i = 0;i<gridViewItems.length;i++){
                gridViewItems[i].children[2].className = '';
                gridViewItems[i].className = 'grid-view-item';
            }
            if (ev.target.parentNode == gridView){
                ev.target.children[2].className = 'checkbox-lick';
                ev.target.className = 'grid-view-item back-color-lick';
            }
            if (ev.target.parentNode.parentNode == gridView){
                ev.target.parentNode.children[2].className = 'checkbox-lick';
                ev.target.parentNode.className = 'grid-view-item back-color-lick';
            }
    };
    //点击document右键菜单消失
    document.onclick = function () {
        domMenu.style.display = 'none';
        fileMenu.style.display = 'none';
    };
    //右键打开
    fileLis[0].onclick = function () {
        for(var i = 0;i<gridViewItems.length;i++){
            if (gridViewItems[i].children[2].className == 'checkbox-lick'){
                doubleClick(gridViewItems[i]);
            }
        }
    };
    //框选
    viewMain.onmousedown = function (ev) {
        arrChoose = [];//每次按下先清空，重现帅选选中的文件夹
        pos.x = ev.clientX;
        pos.y = ev.clientY;
        ev.preventDefault();
        //在文件夹上按下
        if (ev.target.parentNode == gridView || ev.target.parentNode.parentNode == gridView){
            //在文件夹父级按下
            if (ev.target.children[2]){
                //在文件夹父级按下如果文件夹选中移动实现拖拽
                if (ev.target.children[2].className == 'checkbox-lick'){
                    isDrag = true;
                }else {//在文件夹父级按下如果文件夹未选中移动实现框选
                    isRect = true;
                }
            }else {//在文件夹子集按下
                //在文件夹子集按下如果文件夹选中移动实现拖拽
                if (ev.target.parentNode.children[2].className == 'checkbox-lick'){
                    isDrag = true;
                }else {//在文件夹子集按下如果文件夹未选中移动实现框选
                    isRect = true;
                }
            }
        }else {//不在文件夹上按下移动实现框选
            isRect = true;
        }
        //把当前页面选中的文件放入arrChoose中
        for(var i = 0;i<gridViewItems.length;i++){
            if (gridViewItems[i].className == 'grid-view-item back-color-lick'){
                arrChoose.push(gridViewItems[i]);
            }
        }
        // console.log(isDrag,isRect);
        //弹窗显示时，不能框选
        if (reName.style.display == 'block'){
            isRect = false;
        }
    };
    document.onmousemove = function (ev) {
        //画方块
        if (isRect){
            var l = ev.clientX;
            var t = ev.clientY;
            var w = Math.abs(l-pos.x);
            var h = Math.abs(t-pos.y);
            var iL = l<pos.x?l:pos.x;
            var iT = t<pos.y?t:pos.y;
            boxChoose.style.left = iL + 'px';
            boxChoose.style.top = iT + 'px';
            boxChoose.style.width = w + 'px';
            boxChoose.style.height = h + 'px';
            //框选
            for(var i=0;i<gridViewItems.length;i++){
                if(duang(boxChoose,gridViewItems[i])){
                    //碰到的
                    checkboxs[i].className = 'checkbox-lick';
                    gridViewItems[i].className = 'grid-view-item back-color-lick';
                }else{
                    //没碰到的
                    checkboxs[i].className = '';
                    gridViewItems[i].className = 'grid-view-item';
                }
            }
            isCheck();
        }
        //拖拽
        if (isDrag){
            var newL = ev.clientX;
            var newT = ev.clientY;
            shadow.style.display = 'block';
            shadow.style.left = newL + 'px';
            shadow.style.top = newT + 'px';
            shadow.innerHTML = arrChoose.length;
            for(var i=0;i<gridViewItems.length;i++){
                if(duang(shadow,gridViewItems[i])){
                    //碰到的
                    for (var j = 0;j<arrChoose.length;j++){
                        //如果碰到的的文件夹与选中的文件夹都不相等，说明拖到了其他未选中的文件夹
                        if (arrChoose.every(function (a){return a != gridViewItems[i]})){
                            //记录拖到的文件夹的名字
                            isDuang = gridViewItems[i].children[1].innerHTML;
                            isDelete = true;
                        }else {
                            isDelete = false;
                        }
                    }
                }
            }
        }
    };
    document.onmouseup = function () {
        if (isRect){
            isRect = false;
            boxChoose.style.cssText = '';
        }
        if (isDrag){
            isDrag = false;
            shadow.style.display = 'none';
            shadow.style.cssText = '';
            if (isDelete){
                //循环所有数据
                for (var i = 0;i<data.length;i++){
                    //拿到当前pid下的所有数据
                    if (data[i].pId == nowPid){
                        //拿到当前pid下与碰撞文件夹名字相同的id
                        if (data[i].name == isDuang){
                            nowId = data[i].id;
                        }
                        console.log(nowId);
                    }
                }
                //拿到选中的数据，并把选中的数据pid改为上边记录的nowId
                for(var i = 0;i<data.length;i++){
                    for (var j = 0;j<arrChoose.length;j++){
                        console.log(nowId);
                        if  (data[i].name == arrChoose[j].children[1].innerHTML){
                            console.log(nowId);
                            data[i].pId = nowId;
                        }
                    }
                }
                console.log(data)
                //删除结构
                for (var i = 0;i<gridViewItems.length;i++){
                    for (var j = 0;j<arrChoose.length;j++){
                        if (gridViewItems[i] == arrChoose[j]){
                            gridView.removeChild(gridViewItems[i]);
                        }
                    }
                }
                isCheck();
                isDelete = false;
                //已全部加载，共几个
                loadN = 0;
                for(var i = 0;i<data.length;i++){
                    if (data[i].pId == nowPid){
                        loadN++;
                    }
                    loadNum.innerHTML = loadN;
                }
            }
        }
    };
    //碰撞检测
    function duang(obj1, obj2) {
        var pos1 = obj1.getBoundingClientRect();
        var pos2 = obj2.getBoundingClientRect();
        if (pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
            return false;
        } else {
            return true;
        }
    }
    /*
        问题
            1.新建重命名
            2.利用截取hash值在数据中找id，截取hash值有可能相同，
            3.右键菜单，功能实现不完整
     * */
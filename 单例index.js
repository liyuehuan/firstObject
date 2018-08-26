var shopSort = (function(){
    //var a = 1 ;
    //获取操作元素

    var header =document.getElementById('header');

    var buttons=header.getElementsByTagName('a');

    var shopList=document.getElementById('shopList');

    //请求shuju

        var Ajax=function () {
                var xhr=new XMLHttpRequest();

                xhr.open('get','data/product.json',false);

                xhr.onreadystatechange=function () {

                    if (xhr.readyState==4&&xhr.status==200){

                        JSON.parse(xhr.responseText);

                    }
                }

                xhr.send();


                return  JSON.parse(xhr.responseText);
            }

        var data=Ajax();

       //console.log(data);//数据请求成功
    //-----------------------------------------------------


    var bindHtml =function(){

        var str=``;

        data.forEach(function (item,index) {

            str+=` <li>
          <img src="${item.img}"/>
          <p class="title">${item.title}</p>
          <p class="hot">热度：${item.hot}</p>
          <del>￥99999</del>
          <span>￥${item.price}</span>
          <p class="time">上架时间：${item.time}</p>
          </li>`

        })
        shopList.innerHTML=str;

    }
//------------------数据绑定页面成功

    var bindClick=function () {
        for (var i = 0; i < buttons.length; i++) {

            buttons[i].index=-1;
            buttons[i].onclick=function () {

                //每次点击的时候让元素的自定义属性发生变化

                this.index*=-1;

                //先循环数据再绑定页面
                var value=this.getAttribute('attrName');

                sortAry(value,this.index);

               changeColor.call(this);
               //
               clearColor.call(this);
            }
        }

    }


    var sortAry = function (value,index){
        if (value=='time'){
            data.sort(function (a,b) {

                return  ((new Date (a.time)-new Date(b.time)))*index
            })

        } else {
            data.sort(function (a,b) {
                return (a[value]-b[value])*index;

            })
        }

        bindHtml(data);

    }

  //------------------------------------------------页面排序成功
    var changeColor=function () {
        console.log(this);
        var down=this.children[1];
        var up=this.children[0];
        console.log(this);
        if (this.index===-1){

            down.classList.add('bg');//classList类名集合
            up.classList.remove('bg');
        } else {
            up.classList.add('bg');//classList类名集合
            down.classList.remove('bg');
        }

    }
    var clearColor=function () {

        for (var i = 0; i < buttons.length; i++) {
            if (this!=buttons[i]){
                console.log(this);

                buttons[i].children[0].classList.remove('bg');
                buttons[i].children[1].classList.remove('bg');

                //buttons[i].index=-1;//让排序总是按照升序排列
            }

        }

    }
    return {
        zhixing:function(){
              Ajax();
             bindHtml(data);
             bindClick();
        }
    }
})()



shopSort.zhixing();
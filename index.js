

      //获取操作元素

    var header =document.getElementById('header');

    var buttons=header.getElementsByTagName('a');

    var shopList=document.getElementById('shopList');

    //请求shuju
      var data=null;

      var xhr=new XMLHttpRequest();

      xhr.open('get','data/product.json',false);

      xhr.onreadystatechange=function () {

          if (xhr.readyState==4&&xhr.status==200){

           data= JSON.parse(xhr.responseText);

          }
      }

      xhr.send();

     // console.log(data);

      //将数据绑定到页面当中

      function bindHtml(data){
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

      bindHtml(data);

      //给元素绑定事件

      for (var i = 0; i < buttons.length; i++) {

          buttons[i].index=-1;
             buttons[i].onclick=function () {

                 //每次点击的时候让元素的自定义属性发生变化

                 this.index*=-1;

                 //先循环数据再绑定页面
                 var value=this.getAttribute('attrName');

                 sortAry(value,this.index);

                 changeColor.call(this);

                 clearColor.call(this);
             }

      }

      //排序

      function sortAry(value,index) {

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

     //排序旁边的箭头根据正序倒叙发生颜色变化
       function changeColor(){

          var down=this.children[1];
           var up=this.children[0];
          if (this.index===-1){

             down.classList.add('bg');//classList类名集合
              up.classList.remove('bg');
          } else {
              up.classList.add('bg');//classList类名集合
              down.classList.remove('bg');
          }

       }
     //只保留最后点击的那个按钮，颜色全部清空

      function clearColor() {

          for (var i = 0; i < buttons.length; i++) {
            if (this!=buttons[i]){

                buttons[i].children[0].classList.remove('bg');
                buttons[i].children[1].classList.remove('bg');

                this.index=-1;//让排序总是按照升序排列
            }

          }

      }

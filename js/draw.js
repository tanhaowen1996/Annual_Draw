var pause = false;
var num   
var numberarry = []; //存放编号
var luck_num = 1;
var regust = [];
var setbox;
var interval = null; //控制器
var startBtn = document.getElementById("start");
var subbtn = document.getElementById("sub");
var flag = false; //判断是否开始
var run_luck = document.querySelector('#shownumber');
var span = document.querySelector('.close');
var drop_back;
var btn_set=document.querySelector("#btnset");
var lownumber = 1;
let luckn;
var firstnum=60;//抽奖人数
var luckyn;
var idn = 0;

print();
function print(){
    console.log("print");
    console.log(localStorage.lucknums);
    if(localStorage.getItem("lucknums")){
    //if(localStorage.lucknums){
        console.log("local"+localStorage.lucknum);
        numberarry = fn(localStorage.getItem("lucknums"));
        //numberarry = fn(localStorage.lucknums);
        for(var i = 1;i <= localStorage.id;i ++){   //修改
            var loid = "id"+i;
            add_numlo(i,localStorage.loid);
            console.log("localloid"+localStorage.loid);
            //numberarry.remove(localStorage.loid);
        }
    }
}
function add_numlo(x,key){
    console.log(key);
    var ul = document.getElementById("luck");
    var obj=document.createElement("li");
    obj.innerHTML= "恭喜 "+ key +" 号";
    obj.id="id"+x;
    if(x == 1){
        ul.appendChild(obj);
    }
    else{
        var ans="id"+x;
        console.log(ans);
        ul.insertBefore(obj,document.getElementById(ans));
    }
}
startBtn.onclick = (e)=>{
    console.log('------------------ click--------------')
    begin();
    e.preventDefault()
    e.stopPropagation()
}

startBtn.onkeyup=function(e){
    if(e.keyCode == 13){
        console.log('----------------- enter-------------',e.keyCode)
        // begin();
    }
    e.preventDefault()
    e.stopPropagation()
}
subbtn.onkeydown=function(e){
    if(e.keyCode == 13){
        close();
    }
}
function begin(){     //开始结束抽奖
    console.log("--------------------begin start---------------------");
    if(numberarry.length < 1){
        startBtn.innerHTML="没有啦";
        alert("已经全部抽取完毕啦！");
    }else if(!interval){
        console.log("start");
        clearInterval(interval);
        startBtn.innerHTML="结束";
        //startBtn.value="jieshu";
        flag = true;
        interval = setInterval(function(){
            luckn = run_num(numberarry[Math.floor((Math.random()*numberarry.length))]);
            console.log(luckn);
        },10);
    }else if(flag==true){
        stop();
    }
    else{
        console.log("=========================")
    }
}
function stop(){ //结束
    flag = false;
    startBtn.innerHTML="下一个";
    console.log(startBtn.innerHTML);
    //alert(luckn);
    clearInterval(interval);
    interval = null;
    //showluckn();
    add_num(luckn);
    console.log(luckn);
    numberarry.remove(luckn);
}
function run_num(number){
    run_luck.innerHTML=number;
    return number;
}
/*function showluckn(){
    luckyn=document.getElementById("lucky_circle");
    luckyn.style.display="block";
}*/
function add_num(lucknum){
    idn ++;
    console.log(lucknum);
    localStorage.id ++;                      //存储有问题
    var ul = document.getElementById("luck");
    var obj=document.createElement("li");
    obj.innerHTML= "恭喜 "+ lucknum+" 号";
    obj.id="id"+idn;
    localStorage.setItem(obj.id,lucknum); //存储id和中奖编号
    if(idn == 1){
        ul.appendChild(obj);
    }
    else{
        var ans="id"+(idn-1);
        console.log(ans);
        ul.insertBefore(obj,document.getElementById(ans));
    }
    //document.getElementById('luck').innerHTML += "&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+lucknum+"</br>";
    //$('.lucky'.prepend("<li><div class='show_num'>"+luckn+"</div></li>"));
}
function toggle1(){
    document.getElementById("luck").style.overflowY="scroll";
}
function toggle2(){
    document.getElementById("luck").style.overflowY="hidden";
}
function showsetbox(){
    setbox=document.getElementById("set_box"); //获取弹窗
    drop_back=document.getElementById("dropback");
    drop_back.style.display="block";
    setbox.style.display="block";
}
function butOnClick(){
    if(event.keyCode == 13){
        var but = document.getElementById("submit");
        but.close();
    }
}
window.onclick = function(event) {
    if (event.target == setbox) {
        setbox.style.display="none";
        //close();
    }
}
span.onclick=function(){
    close();
}
function close(){
    setbox.style.display="none";
    drop_back.style.display="none";
}
Array.prototype.remove=function(val){
    for(let i = 0;i < this.length;i ++){
        if(this[i]==val){
            console.log("删除"+val);
            this.splice(i,1);
            break;
        }
    }
}
function submit(){  //获取人数
    num = document.getElementById("innumber");
    if(num.value == ""){
        alert("请输入人数！");
        return;
    }
    localStorage.setItem("lucknums",num.value);
    //localStorage.lucknum = num.value;
    //localStorage.id=0;
    localStorage.setItem("id",0);
    firstnum = num.value;
    numberarry = fn(num.value);
    document.getElementById("luck").innerHTML= null;
    //localStorage.clear();
    startBtn.innerHTML="开始";
    run_luck.innerHTML=0;
    //alert(numberarry);
    close();
}
function fn(n){    //初始化
    idn = 0;
    if(n == 0)
    return 0;
    var arr=[];
    (function(){
        arr.unshift(n);
        n --;
        if(n!=0) arguments.callee(n);
    })();
    return arr;
}
function reset(){
    startBtn.innerHTML="开始";
    run_luck.innerHTML=0;
    console.log(firstnum);
    numberarry=fn(firstnum);
    document.getElementById("luck").innerHTML= null;
    //localStorage.id=0;
    localStorage.setItem("id",0);
    //localStorage.clear();
    close();
}
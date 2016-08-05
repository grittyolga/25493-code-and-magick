var getMessage;
var a;
var b;


var getMessage = function (a, b) {
  if (typeof(a) == "boolean" ) {
    if (a == true) {
      return 'Я попал в ' + b;
    }else if (a == false) {
      return 'Я никуда не попал';
    }
  }


  else if (typeof(a) == "number")  return 'Я прыгнул на ' + a * 100 +' сантиметров';


  //else if (typeof(a) == "object" && (a instanceof Array) && typeof(b) == "object" && (b instanceof Array)) { //предыдущий вариант условия
  else if (Array.isArray(a) == true && Array.isArray(b) == true) { // поменяла местами это условие и последнее, т.к. иначе в это условие не было захода
    var distancePath = 0;
    for (var i=0; i < a.length; i++) {
      distancePath = distancePath + a[i] * b[i];
    }
      //alert("aaaaa"); //проверочный вывод (заходит ли вообще в условие)
    return 'Я прошел ' +  distancePath + ' метров';  //тоже светит красным, но метры считаются

  }
else if  (Array.isArray(a) == true) {
    var numberOfSteps = 0;
    for (var i=0; i < a.length; i++) {
      numberOfSteps += a[i];
    }
    return 'Я прошел ' + numberOfSteps + ' шагов'; // не понимаю, почему светит красным сообщение; шаги считаются
  }

};

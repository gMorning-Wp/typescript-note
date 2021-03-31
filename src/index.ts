// import './dataType';
// import './enum';
// import './interface';
import './class';
const a: string = "ddd";
document.querySelectorAll('.app')[0].innerHTML = a;
//! 下面报错的原因是。document.querySelector('.app')可能会是null，ts预先判断出了这样的结果，所以禁止使用，可以在tsconfig.json 中设置strictNullChecks:false 来关闭这种校验。而document.querySelectorAll('.app')[0]也会存在undefined的情况。但是ts没有对其做验证。所以不报错
// document.querySelector('.app').innerHTML =a
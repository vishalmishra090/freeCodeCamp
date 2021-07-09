import $ from 'jquery'
import './styles.scss'


let exprElem = $("#expression")[0]; 
let dispElem = $("#display")[0];
let isBracket = false;
let bracketCount = 0;
let isEqual = false;
let isDecimal = false;
let operator = {
    add: "+",
    sub: "-",
    mul: "×",
    div: "÷"
}
let symbol = {
    oBracket: "(",
    cBracket: ")",
    sqrt: "√",
    percent: "%"
}

let expr = []
let disp = []
let result = NaN


function calcHandler(e){
    let isNumber = /[0-9\.]/g.test(e.key) || [...e.target?.classList].includes("number")
    let isOperator = /[\+\-\*\/]/g.test(e.key) || [...e.target?.classList].includes("operator")
    let isSymbol = /[\%\(\)]/g.test(e.key) || [...e.target?.classList].includes("symbol")
    let isEnter = /Enter/g.test(e.key) || e.target?.id === "equals"
    let isBackspace = /Backspace/g.test(e.key) || e.target?.id === "clear-last"
    let isDelete = /Delete/g.test(e.key) || e.target?.id === "clear"
    if(isOperator && e.type === "keydown"){
        e.key = e.key.replace("+",operator.add)
        .replace('*',operator.mul)
        .replace('/',operator.div)
        .replace('-',operator.sub)
    }
    let textContent = e.key || e.target?.textContent


    if(isEqual && !(isEnter || isBackspace)){
       if(isNumber || isOperator || isSymbol || isDelete)
         clear()
       if(!isNumber){
        expr = [...result]
        disp = []
        result = NaN
       }
    }
    if(isEqual && isEnter){
        return
    }
  
   let exprLength = expr.length
   let exprLastItem = expr[exprLength - 1]
   let exprLastSecItem = expr[exprLength - 2] // Last second elem
   let dispLength = disp.length
   let isHandel = false
   
   
    if(isNumber){
       isHandel =  handelNumber(textContent,exprLength,exprLastItem) 
        isHandel && updateDisplay()
    }
    if(isOperator){
       isHandel = handelOperator(textContent,exprLength,exprLastItem,exprLastSecItem)
       isHandel && updateDisplay()
       isHandel && (isDecimal = false)
    }
    if(isSymbol){
        isHandel =handelSymbol(textContent,exprLength,exprLastItem,dispLength)
        isHandel && updateDisplay()
        isHandel && (isDecimal = false)
    }
    if(isDelete){
        clear()
    }
    if(isBackspace){
        clearLast(exprLength,exprLastItem,exprLastSecItem)
        updateDisplay()
    }
    if(isEnter){
        handelEqual()
        updateDisplay()
    }
  
    isHandel = false
    
    exprElem.scrollLeft = exprElem.scrollWidth
    dispElem.scrollLeft = dispElem.scrollWidth
    $("button").blur()
}


function clearLast(exprLength,exprLastItem,exprLastSecItem){
    if(symbol.cBracket === exprLastItem){
        isBracket = true
        bracketCount++
    }
    if(symbol.oBracket === exprLastItem){
        bracketCount--
        if(bracketCount === 0){
            isBracket=false
            bracketCount=0
        }
    }

    if(isEqual){
        isEqual = false
        expr.pop()
        disp = []
        return
    }

    if(exprLastItem === symbol.oBracket && 
        exprLastSecItem === symbol.sqrt){
        expr.pop()
        expr.pop()
        disp.pop()
        disp.pop()

    }else if(/[0-9]/.test(exprLastItem)){
        expr.pop()
        disp.pop()
    }else if(exprLastItem === symbol.percent){
        if(exprLength === 2 && exprLastSecItem === "0"){
            expr.pop()
            expr.pop()
            disp.pop()
            disp.pop()
        }else{
            expr.pop()
            expr.pop()
        }
        
    }else if(exprLastItem === "." && exprLastSecItem === "0"){
        clear()
    }
    else{
        expr.pop()
        disp.pop()
    }

}

function clear() {
  isBracket = false;
  bracketCount = 0;
  isEqual = false;
  isDecimal = false
  expr = [];
  disp = [];
  $(exprElem).text("0");
  $(dispElem).text("0");
}

function updateDisplay() {
  if(!expr.length){
      clear()
      return
  }
  $(exprElem).text(expr.join(''));
  $(dispElem).text(disp.join(''));
}


function handelNumber(num,exprLength,exprLastItem) {


  if(num === "." ){
      if(isDecimal)
        return false;
      if(!exprLength){
          expr.push("0",".")
          disp.push("0", ".")
      }else{
        expr.push(".")
        disp.push(".")
      }

      isDecimal = true
      return true
  }
  if(num === "0" && !exprLength){
      return false
  }

  if(!exprLength){
    expr.push(num);
    disp.push(num);
  }else{
    
    if(exprLastItem === symbol.percent || exprLastItem === symbol.cBracket ){
        expr.push(operator.mul,num);
        if(isBracket)
           disp.push(operator.mul,num);
        else
            disp = [num]
    }else{
        expr.push(num);
        disp.push(num);
    }
  }

  return true
}


function handelOperator(newOperator,exprLength, exprLastItem,exprLastSecItem) {
  
  if(!exprLength && newOperator !== operator.sub)
     return false

  if(exprLength === 1 && exprLastItem === operator.sub)
     return  false

  if(exprLastItem === operator.sub && 
    new RegExp(`[${operator.mul}${operator.add}${operator.div}]`).test(exprLastSecItem)){
       if(newOperator === operator.sub){
           return false
       }
       expr.pop()
       expr.pop()
       disp.pop()
       disp.pop()
       expr.push(newOperator)
       isBracket 
       ? disp.push(newOperator)
       : disp = [];

       return true
  }
  if(exprLastItem === operator.add && newOperator === operator.sub){
    expr.pop();
    isBracket && disp.pop();
    expr.push(newOperator);
    isBracket 
   ? disp.push(newOperator)
   : disp = [];
    return true
  }
  
  if(Object.values(operator).includes(exprLastItem) && newOperator !== operator.sub){
     if(exprLastItem === newOperator)
         return false

     expr.pop();
     isBracket && disp.pop();
     expr.push(newOperator);
     isBracket 
    ? disp.push(newOperator)
    : disp = [];
     return true
  }

  if(exprLastItem === operator.sub){
      return false
  }

  if(exprLastItem === symbol.oBracket && (newOperator === operator.add || newOperator === operator.mul || newOperator === operator.div)){
      return  false
  }

  if(new RegExp(`[${operator.mul}${operator.div}]`).test(exprLastItem) && newOperator === operator.sub){
    expr.push(newOperator);
    disp.push(newOperator);
    return true;
  }

  
  isBracket || !exprLength
    ? disp.push(newOperator)
    : disp = [];
  expr.push(newOperator);
   
  return true
}

function handelSymbol(newSymbol, exprLength, exprLastItem,dispLength) {

  // Sqrt
  if (newSymbol === symbol.sqrt) {
    if(!exprLength){
        expr = [newSymbol, symbol.oBracket]
        disp= [newSymbol , symbol.oBracket];
        isBracket = true;
        bracketCount++;
        return true
    }
    if(/[0-9]/.test(exprLastItem)||
    exprLastItem === symbol.cBracket || exprLastItem === symbol.percent
    ){
        
        expr.push(operator.mul,newSymbol , symbol.oBracket);
        if(!isBracket){
            disp = [newSymbol , symbol.oBracket];
        }else{
            disp.push(operator.mul,newSymbol , symbol.oBracket); 
        }
        
    }else{
        expr.push(newSymbol , symbol.oBracket);
        disp.push(newSymbol , symbol.oBracket);
    }
        isBracket = true;
        bracketCount++;

        return true
  } 

  // Open Bracket
  if (newSymbol === symbol.oBracket) {

    if(
        (/[0-9]/.test(exprLastItem)||exprLastItem === symbol.cBracket) && !isBracket){
        expr.push (operator.mul , newSymbol);
        disp = [newSymbol];
    }else{
        expr.push(newSymbol);
        disp.push(newSymbol);
    }
    isBracket = true;
    bracketCount++;
    return true
  } 

  // Close Bracket
  if (newSymbol === symbol.cBracket) {
    if(exprLastItem === symbol.oBracket){
        return false
    }
    if(Object.values(operator).includes(exprLastItem)){
        return false
    }
    if (isBracket) {
      bracketCount--;
      if (bracketCount === 0) {
        isBracket = false;
        bracketCount=0
      }
      expr.push(newSymbol);
      disp.push(newSymbol);
    }

    return true
  }
  
  // Percent
  if(newSymbol === symbol.percent){
    if(!dispLength || exprLastItem === symbol.oBracket){
        expr.push("0" , newSymbol);
        disp.push("0" , newSymbol);
    }else{
        expr.push(newSymbol);
        disp.push(newSymbol); 
    }

    return true
  }

}

function handelEqual(){
    if(isEqual){
        return false
    }
    let expression = expr.join('');
    expression = expression
    .replaceAll(operator.mul, "*")
    .replaceAll(operator.sub, "-")
    .replaceAll(operator.div, "/")
    .replaceAll(operator.add, "+")
    .replaceAll(symbol.sqrt, "Math.sqrt")
    .replaceAll(symbol.percent, "*(1/100)")
    .replaceAll(')(',')*(')

    isEqual = true
    expr.push("=")
    try{
      result = window.Function(
          `return ${expression}`
      )()
      
      if(result.toString().length > 14){
          if(/[e]/g.test(result.toString())){
               result = result.toExponential(8)
          }
          else if(/[.]/g.test(result.toString())){
            result = result.toPrecision(8)
          } else{
            result = result.toExponential(8)
          }
      }
      if(isNaN(result)) throw new Error()
      disp = [...result.toString()]
      result = result.toString()
    }catch(e){
       disp = [..."ERROR"]
    }
    
    return true
}

$("#calculator").on("click",calcHandler)
$(document).on("keydown",calcHandler)
clear();

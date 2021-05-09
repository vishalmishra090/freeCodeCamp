function convertToRoman(num) {
    let baseRoman = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"]
    let baseValue = [1,4,5,9,10,40,50,90,100,400,500,900,1000]
    let i = baseValue.length - 1;
    let romanNum = "";
    while(num > 0){
      var q = num / baseValue[i];
      num = num % baseValue[i];
      while(Math.floor(q) > 0){
        romanNum = romanNum + baseRoman[i]
        q--;
      }
      i--;
    }
   
    return romanNum;
   }
   
   convertToRoman(2);
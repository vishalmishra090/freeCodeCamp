function rot13(str) {
    // let firstLetterCode = 65;
    // let lastLetterCode = 90;
    let encodedStr = ""
    for(let i = 0; i < str.length; i++){
      let code = str.charCodeAt(i);
      if(code < 65 || code > 90){
        encodedStr += str[i];
        continue;
      }
      code = code - 13;
      if(code < 65){
        code = 90 - (64 - code)
      }
      encodedStr = encodedStr + String.fromCharCode(code);
    }
    
    return encodedStr;
  }
  
  rot13("SERR PBQR PNZC");
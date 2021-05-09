function palindrome(str) {
    str = str.replace(/[^a-z\d]/ig,'').toLowerCase();
  
    return checkpalindrome(str);
  }
  
  function checkpalindrome(str){
    if((str.length === 1) || (str.length === 0)) {

      return true

    }else if(str[0] === str[str.length-1]){

      return checkpalindrome(str.slice(1, str.length-1))

    }else{

      return false
      
    }
  }
  
  palindrome("eye");
$.when( $.ready ).then(async function() {
    await showNewQuote()
    $("#new-quote").on("click",async () => {
        $("#btn-loader").css("display","block")
        $("#btn-text").css("visibility","hidden")
        await showNewQuote()
        $("#btn-loader").css("display","none")
        $("#btn-text").css("visibility","visible")
    })
});

// functions

function randomColor(){
    function randomColorCode(currentCode=[]){
        let code = ["r","g","b"].filter((value) => {
            return !currentCode.includes(value)
        })

        return code[generateRandomNo(0, code.length-1)]
    }

    let color = {}
    color[randomColorCode()] = 255
    color[randomColorCode(Object.keys(color))] = 0
    color[randomColorCode(Object.keys(color))] = generateRandomNo(0, 255)

    return color
}

function generateRandomNo(min,max){
    try{
        if(min <= max){
          return Math.floor(Math.random() * (max-min+1) + min)
        }else{
            throw Error
        }
    }catch{
        console.log("Must be min > max")
    }
}

function changeCSS(){
    let {r,g,b} = randomColor()

    let r2 = r > 30 ? r - 30  : r;
    let g2 = g > 30 ? g - 30 : g;
    let b2 = b > 30 ? b - 30 : b;

    $("#container").css({
        backgroundColor: `rgb(${r}, ${g}, ${b}, 0.4)`,
        color: `rgb(${r2}, ${g2}, ${b2}, 1)`
    })
    
    $("#quote-box").css("color", `rgb(${r2}, ${g2}, ${b2}, 1)`)

    $(".btn").css({
        backgroundColor: `rgb(${r2}, ${g2}, ${b2}, 1)`
    })

   $(".btn").each((i, elem) => {
       $(elem).on("mouseenter", () => {
           $(elem).css({
            backgroundColor: `rgb(${r}, ${g}, ${b}, 1)`
           })
       })

       $(elem).on("mouseleave", () => {
        $(elem).css({
            backgroundColor: `rgb(${r2}, ${g2}, ${b2}, 1)`
           })
       })
   })
       
}

async function fetchNewQuote(){
    let url = "https://api.quotable.io/random?maxLength=260"
    let res = await fetch(url)
    if(res.ok){
        let result = await res.json()
        return result
    }
}

function getTweetUri(content, author){
    return "https://twitter.com/intent/tweet?text=" + encodeURI(content + "\n" + "~" + author)
}

async function showNewQuote(){
    let quote = await fetchNewQuote()
    $("#text").text(quote.content)
    $("#author").text("~ " + quote.author)
    $("#tweet-quote").attr("href", getTweetUri(quote.content, quote.author))
    $("#page-loader").css("display", "none")
    $("#quote-box").css("display", "block")
    changeCSS()
}









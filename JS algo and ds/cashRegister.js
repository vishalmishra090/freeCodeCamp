let currencyunit = [{
    unitName: "PENNY",
    unitValue: 0.01
}, {
    unitName: "NICKEL",
    unitValue: 0.05
}, {
    unitName: "DIME",
    unitValue: 0.1
}, {
    unitName: "QUARTER",
    unitValue: 0.25
}, {
    unitName: "ONE",
    unitValue: 1
}, {
    unitName: "FIVE",
    unitValue: 5
}, {
    unitName: "TEN",
    unitValue: 10
}, {
    unitName: "TWENTY",
    unitValue: 20
}, {
    unitName: "ONE HUNDRED",
    unitValue: 100
}
]

function checkCashRegister(price, cash, cid) {
    var changeCash = cash - price;
    var totalCashInCID = 0;
    var result = {
        status: "INSUFFICIENT_FUNDS",
        change: []
    }

    for (let i = currencyunit.length - 1; i >= 0; i--) {

        let {unitName, unitValue} = currencyunit[i];

        let amount = cid[i][1];

        totalCashInCID = totalCashInCID + amount;

        if ((changeCash > unitValue) || (amount === 0)) {
          
            if(changeCash > amount){
                result.change.push([unitName,amount])
                changeCash =  Math.round((changeCash - amount) * 100)/100
            }else{
                let getAmount = Number.parseInt(changeCash / unitValue) * unitValue;
                result.change.push([unitName,getAmount])
                changeCash = Math.round((changeCash - getAmount) * 100)/100;
            }

        }else{
            continue;
        }
    }

    if(changeCash === 0){
       if(totalCashInCID === (cash - price)){
          result.status = "CLOSED"
          result.change = cid;
       }else{
           result.status = "OPEN"
       }

       return result

    }else{
        result.status = "INSUFFICIENT_FUNDS"
        result.change = [];

        return result;
    }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
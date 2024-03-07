
//elements
const dropdowns = document.querySelectorAll(" .dropdown select");
const msg = document.querySelector(" .msg ");
const btn = document.getElementById("btn");

//conversion api
let getcur = async (from, to) => {
    let response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`);
    let data = await response.json();

    return data[from][to];
}

//default view
getcur("usd", "inr").then((val) => {
    msg.innerText=`1 USD = ${val} INR`;
});


const updateFlag = (element) => {
    let country = element.value;
    let newsrc = `https://flagsapi.com/${countryList[country.toUpperCase()]}/flat/64.png`;
    element.parentElement.querySelector("img").src = newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();

    // let amountele=document.getElementsByClassName("amount");
    // let amount=amountele[0].querySelector("input").value;

    let amountele = document.querySelector(".amount input");
    amount = amountele.value;
    if (amount == "" || amount < 1) {
        console.log("amount is not valid");
        amountele.value = 1;
        amount = 1;
    }

    let fromcur = document.querySelector("#from").value;
    let tocur = document.querySelector("#to").value;
    getcur(fromcur, tocur).then((val) => {
        val=val*amount;
        msg.innerText=`${amount} ${fromcur.toUpperCase()} = ${val} ${tocur.toUpperCase()}`;
    });
    // console.log(multiplier);

})

for (let select of dropdowns) {
    for (code in countryList) {
        let newopt = document.createElement("option");
        newopt.innerText = code;
        newopt.value = code.toLowerCase();
        if (code === "USD" && select.id === "from") {
            newopt.selected = "selected";
        }
        if (code === "INR" && select.id === "to") {
            newopt.selected = "selected";
        }
        select.append(newopt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
}



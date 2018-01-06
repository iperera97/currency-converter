document.addEventListener("DOMContentLoaded", function(){

//================ AJAX Call for get currency data =====================

var currencyRq = new XMLHttpRequest();
				
	currencyRq.onreadystatechange = function(){

	var checkCurrencyRq = ( currencyRq.readyState == 4 && currencyRq.status == 200 ) ? JSON.parse(currencyRq.response) : false;

		if(typeof checkCurrencyRq === "object"){

			createCurrencyConv( checkCurrencyRq );

		};

	};

var clientApiKey = document.querySelector("script[data-name=currency-api]").getAttribute("src");

currencyRq.open("GET", clientApiKey, true);
currencyRq.send();

//..............................


//================ Create Currency Calculator =============================

function createCurrencyConv(currencyObj){
var money1, money2, crrtMoney1, crrtMoney2, output, amount;

//fire when amount box key up 
	document.querySelector("#amount").addEventListener("keyup", function(event){

//get valueof money1 and 2
		money1 = document.querySelector("#money1").value;
		money2 = document.querySelector("#money2").value;

//create structure 
		crrtMoney1 = "USD" + money1.toUpperCase();
		crrtMoney2 = "USD" + money2.toUpperCase();

//get values from json
		var mValue1 = currencyObj.quotes[crrtMoney1];
		var mValue2 = currencyObj.quotes[crrtMoney2];

//convert each money type to another money type
		var finalVal = ( mValue2 / mValue1 ).toFixed(4);

//get amount		
		amount = Number(this.value) * finalVal;

//if amount is not a number this block will execute
		errorDiv = document.querySelector("#error");
		
		if( isNaN( amount ) ){
		var errorDiv, errorPara;

		errorPara = document.createElement("p");
	
		errorDiv.innerHTML = "";
		errorPara.innerHTML = "Please Enter the Correct Informations";
	
		errorDiv.appendChild(errorPara);

		}else{

		errorDiv.innerHTML = "";
		output = document.querySelector("#output");
		output.value = amount;

		}

	});
	
}

//......................................



});



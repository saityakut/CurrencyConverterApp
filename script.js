// api key
const apiKey = '<your api key>';
// main url
const url = 'https://v6.exchangerate-api.com/v6/' + apiKey;

// elements

const currencyOne = document.getElementById('currency_one');
const currencyTwo = document.getElementById('currency_two');
const list_one = document.getElementById('list_one');
const list_two = document.getElementById('list_two');
const amount = document.getElementById('amount');
const calculate = document.getElementById('calculate');
const result = document.getElementById('result');

fetch(url + '/codes')
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`;
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
});

calculate.addEventListener('click', function () {
    const _currencyOne = currencyOne.value;  
    const _currencyTwo = currencyTwo.value;  
    const _amount = amount.value;
    
    fetch(url + '/latest/' + _currencyOne)
        .then(res => res.json())
        .then(data => {
            const _result = (data.conversion_rates[_currencyTwo] * _amount).toFixed(3);
            console.log(result);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size: 30px; color:black">
                        ${_amount} ${_currencyOne} = ${_result} ${_currencyTwo}
                    </div>
                </div>
            `;
        });
});
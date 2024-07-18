let myChart;
let barColors = ["red", "green", "aqua", "orange", "brown","yellowgreen","chartreuse","blue","burlywood"];

async function getdata(customernameValue = "", customeramountValue = "") {
  let response = await fetch("main.json");
  let result = await response.json();

  let table = "";
  let filteredTransactions = [];

  for (let i = 0; i < result.customers.length; i++) {
    let customer = result.customers[i];
    let transaction = result.transactions[i];

    if (
      (customernameValue == "" ||
        customer.name.toLowerCase().includes(customernameValue.toLowerCase())) &&
      (customeramountValue == "" ||
        transaction.amount.toString().includes(customeramountValue))
    ) {
      table += `<tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${transaction.date}</td>
          <td>${transaction.amount}</td>
        </tr>`;
      filteredTransactions.push(transaction.amount); 
    }
  }

  document.querySelector("#data").innerHTML = table;
  updateChart(filteredTransactions); 
}
function updateChart(data) {
  const ctx = document.getElementById("transactionChart").getContext("2d");
  if (myChart) {
    myChart.destroy(); 
  }
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map((_, index) => `customer ${index + 1}`),
      datasets: [
        {
          label: "Amounts",
          data: data,
          backgroundColor: barColors,
          
        },
      ],
    },
    options: {
      scales: {
          beginAtZero: true,
        },
      },
  });
}

getdata();
  

let customername = document.querySelector("#customername");
customername.addEventListener("input", function () {
  getdata(customername.value, customeramount.value);
});

let customeramount = document.querySelector("#customeramount");
customeramount.addEventListener("input", function () {
  getdata(customername.value, customeramount.value);
});

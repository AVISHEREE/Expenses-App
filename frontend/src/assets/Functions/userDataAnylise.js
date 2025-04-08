import {jwtDecode} from 'jwt-decode';
import refreshRefreshToken from '@/assets/Functions/refreshAccessToken.js';
import moment from "moment";
import { lH } from './host.js';
// import
moment.createFromInputFallback = function(config) {
  config._d = new Date(config._i); // Use default Date constructor
};
const getData = async () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if(user){
    const userId = user.user_id;
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const isexpire = isTokenExpired(token);
  if(isexpire){
    await refreshRefreshToken();
  }
  const response = await fetch(
    `http://${lH}/v1/expense/get-all-expenses`,
    {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if(user.message){
    return;
  }
  const userExpenses = await response.json();
  console.log(userExpenses);
  userExpenses.map((items) => {
    items.date = moment(items.date).format("DD MMMM, YYYY");
  });
  return userExpenses;
  }
  
};
    
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Token is invalid or expired
  }
};

const analizeTotalSpending = async (Data = []) => {
  let amount = 0;

  // if (!Array.isArray(Data)) {
  //   console.error("Data is not an array:", Data);
  //   return 0;
  // }

  Data.forEach((item) => {
    amount += item.amount || 0;
  });

  return amount;
};

const analizeTotalSpedingInOneMonth = async () => {
  await Data
  let amount = 0;
  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });

  // if (!Array.isArray(Data)) {
  //   return 0;
  // }

  amount = Data.filter(item => moment(item.date).format("MMMM") === monthName)
              .reduce((total, item) => total + (item.amount || 0), 0);

  return amount;
};

let totalSpending ;
let totalSpendingInOneMonth ;
let Data;
async function init() {
   Data = await getData();
   if (Data) {
     totalSpending = await analizeTotalSpending(Data);
     totalSpendingInOneMonth = await analizeTotalSpedingInOneMonth(Data);
  }
}

init();

export { totalSpending , totalSpendingInOneMonth , Data };



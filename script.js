// function getDataFromAPI() {
//   document.getElementById("loader").style.display = "block";

//   fetch("https://gauravgitacc.github.io/postAppData/auctionData.json")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Data", data);
//       let innerHtml = "";
//       data.forEach((item) => {
//         innerHtml += `
//         <div class='myDiv'>
//             <h1>${item.status}</h1>
//             <h3>${item.caseNumber}</h3>
//         </div>
//         `;
//       });
//       document.getElementById("loader").style.display = "none";
//       document.getElementById("container").innerHTML = innerHtml;
//     }).catch((err) => {});
// }

//fetch the data from Api 
//by using async or await 
var arr = [];

async function getDataFromAPI() {
 
    document.getElementById("loader").style.display = "block";
    console.log("Fetching Data...");

  try {
    const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");
    arr = await response.json();
    sessionStorage.setItem("myArr", JSON.stringify(arr)); // here i'm storing the data in session storage
    // JSON.stringify(arr)- here pass arr as an agrumenet. its convert the arr( JavaScript objects) into string
    
    // alert("Added to Session Storage");
    if (arr) {
      console.log("data", arr);
      showData(arr);

      document.getElementById("loader").style.display = "none";
    }
  } 
//   something is missing in fetch data  show the error
  catch (e) {
    console.log("Error--", e);
  }
}

if (sessionStorage.getItem("myArr")) 
  {
  // user is coming again in the session
  //   alert("Getting from Session Storage");
  var myArr = JSON.parse(sessionStorage.getItem("myArr"));

  showData(myArr);
  arr = myArr;
 } 
else {
  // user is coming to the session for the very first time
  getDataFromAPI();
}

// searching 
document.getElementById("search").addEventListener("input", () => {
  var newArr = arr.filter((item) => 
      item.toLocation
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  showData(newArr);
});



function showData(myArr) {
  document.getElementById("container").innerHTML = "";
  let card_container = "";
//   forEach - iterate on element of array - give the vlaue of particular element
  myArr.forEach((item) => {
    card_container += `
                <div class='myDiv'>
                       
                   <div class='flex-info'>
                        
                        <div>
                            <div class='chip ${ // here i'm using ternary operator on class
                              item.status == "PENDING"
                                ? "yellow" // yes
                                : item.status == "CANCELLED" //no
                                ? "red" //yes
                                : item.status == "APPROVED" //no
                                ? "blue" //yes
                                : "" //no
                               }' >${item.status}</div>
                               <p>${item.caseNumber}</p>
                             </div>
                        
                             <p>${item.date}</p>
                        </div>
                    
                    <hr/>
                    
                    <div>
                            <strong>${item.toLocation}</strong>
                            <p>${item.fromLocation} <span style='float:right;'>${item.fare}</span></p>
                    </div>
                
                </div>
                
                `;
  });
  document.getElementById("container").innerHTML = card_container;
}
export function fetchingGET(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data.map(part=>{
        console.log(part);
      })
    }
    );
}

export function fetchingPOST(data){

  const url = "http://localhost:3000/api/rating/add";

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(json => console.log(json)).catch(err => console.log(err));

}

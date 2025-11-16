let rows=100;
let columm=26;

let addresscolcont=document.querySelector(".address-col-cont");
for(let i=0;i<rows;i++)
{
  let addresscol=document.createElement("div");
  addresscol.setAttribute("class","address-col")
  addresscol.innerText=i+1;
  addresscolcont.appendChild(addresscol);
}

let addressrowcont=document.querySelector(".address-row-cont");
for(let i=0;i<columm;i++)
  {
    let addressrow=document.createElement("div");
    addressrow.setAttribute("class","address-row")
    addressrow.innerText=String.fromCharCode(65+i);
    addressrowcont.appendChild(addressrow);
  }

let cellcount=document.querySelector(".cells-cont");
for(let i=0;i<rows;i++){
  let rowcont=document.createElement("div");
  rowcont.setAttribute("class","row");
  for(let j=0;j<columm;j++)
  {
    let cell=document.createElement("div");
    cell.setAttribute("contenteditable","true");
    cell.setAttribute("class","cell");
    cell.setAttribute("spellcheck","false");

    //for storage and cell event relation
    cell.setAttribute("rid",i);
    cell.setAttribute("cid",j);
    rowcont.appendChild(cell);
    addListenerForAddressBarDisplay(cell,i,j);
  }
  cellcount.appendChild(rowcont);
}
let addressBar=document.querySelector(".address-bar")
function addListenerForAddressBarDisplay(cell,i,j)
{
  cell.addEventListener("click",()=>{
    let rowid=i+1;
    let colid=String.fromCharCode(65+j);
    addressBar.value=`${colid}${rowid}`;
  })
}

//by default cell click to avoid problem via dom
let firstcell=document.querySelector(".cell");
firstcell.click();
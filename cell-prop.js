//storage
let sheetDB=[];
  for(let i=0;i<rows;i++)
  {
    let sheetrow=[];
    for(let j=0;j<columm;j++)
    {
      let cellprop={
        bold:false,
        italic:false,
        underline:false,
        alignment:"left",
        fontFamily:"Times New Roman",
        fontSize:"14",
        fontColor:"#000000",
        fontbg:"#ffffff",
        value:"",
        formula:"",
        children:[]
      }
      sheetrow.push(cellprop);
    }
    sheetDB.push(sheetrow);
  }
 
//selector for cell
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily=document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");
let fontbg=document.querySelector(".back-color-prop");
let alignment=document.querySelectorAll(".alignment");
let leftalign=alignment[0];
let centeralign=alignment[1];
let rightalign=alignment[2];


let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";
//appplication of two way binding


//event listner
bold.addEventListener("click",()=>{
  let address=addressBar.value;
   let [cell,cellProp]=getCellandCellProp(address);

   //modification
   cellProp.bold=!cellProp.bold; //data change
   cell.style.fontWeight=cellProp.bold?"bold":"normal"; //ui chnage 1
   bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp; //ui change 2

})

italic.addEventListener("click",()=>{
  let address=addressBar.value;
   let [cell,cellProp]=getCellandCellProp(address);

   //modification
   cellProp.italic=!cellProp.italic; //data change
   cell.style.fontStyle=cellProp.italic?"italic":"normal"; //ui chnage 1
   italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp; //ui change 2
})

underline.addEventListener("click",()=>{
  let address=addressBar.value;
   let [cell,cellProp]=getCellandCellProp(address);

   //modification
   cellProp.underline=!cellProp.underline; //data change
   cell.style.textDecoration=cellProp.underline?"underline":"none"; //ui chnage 1
   underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp; //ui change 2
})

fontSize.addEventListener("change",(e)=>{
  let address=addressBar.value;
  let [cell,cellProp]=getCellandCellProp(address);

  cellProp.fontSize=fontSize.value; //data change
  cell.style.fontSize=cellProp.fontSize+"px";
  fontSize.value=cellProp.fontSize;
})

fontFamily.addEventListener("change",(e)=>{
  let address=addressBar.value;
  let [cell,cellProp]=getCellandCellProp(address);

  cellProp.fontFamily=fontFamily.value; //data change
  cell.style.fontFamily=cellProp.fontFamily;
  fontFamily.value=cellProp.fontFamily;
})

fontColor.addEventListener("change",(e)=>{
  let address=addressBar.value;
  let [cell,cellProp]=getCellandCellProp(address);

  cellProp.fontColor=fontColor.value; //data change
  cell.style.color=cellProp.fontColor;
  fontColor.value=cellProp.fontColor;
})

fontbg.addEventListener("change",(e)=>{
  let address=addressBar.value;
  let [cell,cellProp]=getCellandCellProp(address);

  cellProp.fontbg=fontbg.value; //data change
  cell.style.backgroundColor=cellProp.fontbg;
  fontbg.value=cellProp.fontbg;
})

alignment.forEach((alignElem)=>{
  alignElem.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellandCellProp(address);

    let alignValue=e.target.classList[0];
    cellProp.alignment=alignValue;   //data chnage
    cell.style.textAlign=cellProp.alignment;  //ui change 1
    switch(alignValue)  //ui change 2
    {
      case "left":
        leftalign.style.backgroundColor=activeColorProp;
        rightalign.style.backgroundColor=inactiveColorProp;
        centeralign.style.backgroundColor=inactiveColorProp;
        break;
      case "center":
        leftalign.style.backgroundColor=inactiveColorProp;
        rightalign.style.backgroundColor=inactiveColorProp;
        centeralign.style.backgroundColor=activeColorProp;
        break;
      case "right":
        leftalign.style.backgroundColor=inactiveColorProp;
        rightalign.style.backgroundColor=activeColorProp;
        centeralign.style.backgroundColor=inactiveColorProp;
        break;
    }

  })
})

let allcells=document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++)
{
  addListenerToAttachCellProperties(allcells[i]);
}


function addListenerToAttachCellProperties(cell)
{
  //work 
  cell.addEventListener("click",(e)=>{

    let address=addressBar.value;
    let [rid,cid]=decodeRIDCIDfromAddress(address);
    let cellProp=sheetDB[rid][cid];

    //apply cell properties

    cell.style.fontWeight=cellProp.bold?"bold":"normal"; //ui chnage 1
    cell.style.fontStyle=cellProp.italic?"italic":"normal"; //ui chnage 1
    cell.style.textDecoration=cellProp.underline?"underline":"none"; //ui chnage 1
    cell.style.fontSize=cellProp.fontSize+"px";
    cell.style.fontFamily=cellProp.fontFamily;
    cell.style.color=cellProp.fontColor;
    cell.style.backgroundColor=cellProp.fontbg;
    cell.style.textAlign=cellProp.alignment;
    
    //apply ui properties
    bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp; //ui change 2
    italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp; //ui change 2
    underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp; //ui change 2

    fontColor.value=cellProp.fontColor;
    fontbg.value=cellProp.fontbg;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch(cellProp.alignment)  //ui change 2
    {
      case "left":
        leftalign.style.backgroundColor=activeColorProp;
        rightalign.style.backgroundColor=inactiveColorProp;
        centeralign.style.backgroundColor=inactiveColorProp;
        break;
      case "center":
        leftalign.style.backgroundColor=inactiveColorProp;
        rightalign.style.backgroundColor=inactiveColorProp;
        centeralign.style.backgroundColor=activeColorProp;
        break;
      case "right":
        leftalign.style.backgroundColor=inactiveColorProp;
        rightalign.style.backgroundColor=activeColorProp;
        centeralign.style.backgroundColor=inactiveColorProp;
        break;
    }

    let fromulaBar=document.querySelector(".formula-bar");
    fromulaBar.value=cellProp.formula;
    fromulaBar.innerText=cellProp.formula;
    cell.value=cellProp.value;
  })
}
function getCellandCellProp(address)
{
  let [rid,cid]=decodeRIDCIDfromAddress(address);
  
  //access cell and storage object
  let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp=sheetDB[rid][cid];4
  return[cell,cellProp];
}

function decodeRIDCIDfromAddress(address)
{
  let rid=Number(address.slice(1)-1);
  let cid=Number(address.charCodeAt(0))-65;
  return[rid,cid];
}


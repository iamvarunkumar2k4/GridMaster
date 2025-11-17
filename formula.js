for(let i=0;i<rows;i++)
{
  for(let j=0;j<columm;j++)
  {
    let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur",(e)=>{
      let address=addressBar.value;
      let [activecell,cellProp]=getCellandCellProp(address);
      let enteredData=activecell.innerText;
      if(enteredData ===cellProp.value) return;
      
      cellProp.value=enteredData;

      //id data modifies remove parent child relation formula empty update children value (hard code way)
      removeChildFromParent(cellProp.formula);
      cellProp.formula="";
      updateChildCells(address);
    })
  }
}

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
          let [parentCell, parentCellProp] = getCellandCellProp(encodedFormula[i]);
          parentCellProp.children.push(childAddress);
      }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
          let [parentCell, parentCellProp] = getCellandCellProp(encodedFormula[i]);
          let idx = parentCellProp.children.indexOf(childAddress);
          parentCellProp.children.splice(idx, 1);
      }
  }
}


let fromulaBar=document.querySelector(".formula-bar");
fromulaBar.addEventListener("keydown",(e)=>{
  let inputFormula=fromulaBar.value;
  if(e.key==="Enter" && inputFormula){
    let evaluatedValue=evaluateFormula(inputFormula);
     
    let address=addressBar.value;
    let [cell,cellProp]=getCellandCellProp(address);

    //if old formula and new formula are different that are being addded 
    if(inputFormula!== cellProp.formula)
    {
       removeChildFromParent(cellProp.formula);
    }

    // to check cycle start
    addChildToGraphComponent(inputFormula,address);  // checking wether the formula if forming a acycle or not before adding it
    console.log(graphComponentMatrix);
    // true for cycle and false for not cycle
    let isCyclic=isGraphCyclic(graphComponentMatrix);
    console.log(graphComponentMatrix);
    if(isCyclic)
    {
      alert("your fomrula is cyclic ");
      removeChildFromGraphComponent(inputFormula,address);
      return;
    }
    // end

    // to update ui and db
    setCellUiandCellProp(evaluatedValue,inputFormula,address);
    addChildToParent(inputFormula);
    console.log(sheetDB);
    updateChildCells(address);
  }
})

function updateChildCells(parentAddress)
{
  let[parentCell,parentCellProp]=getCellandCellProp(parentAddress);
  let children=parentCellProp.children;
  for(let i=0;i<children.length;i++)
  {
    let childAddress = children[i];
    let [childCell,childCellProp]=getCellandCellProp(childAddress);
    let childFormula=childCellProp.formula;
    let evaluatedValue=evaluateFormula(childFormula);
    setCellUiandCellProp(evaluatedValue,childFormula,childAddress);
    // updateChildCells(childAddress);
  }
}


function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
          let [cell, cellProp] = getCellandCellProp(encodedFormula[i]);
          encodedFormula[i] = cellProp.value;
      }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function setCellUiandCellProp(evaluatedValue,formula,address){
  let [cell,cellProp]=getCellandCellProp(address);
  //ui update
  cell.innerText=evaluatedValue;
  //db update
  cellProp.value=evaluatedValue;
  cellProp.formula=formula;
}

function addChildToGraphComponent(formula, childAddress) {
  let [crid,ccid] = decodeRIDCIDfromAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
        let [prid, pcid] = decodeRIDCIDfromAddress(encodedFormula[i]);
          // B1: A1 + 10
          // rid -> i, cid -> j
          graphComponentMatrix[prid][pcid].push([crid,ccid]);
      }
  }
}


function removeChildFromGraphComponent(formula,childAddress){
  let [crid,ccid]=decodeRIDCIDfromAddress(childAddress);
  let encodedFormula=formula.split(" ");
  for(let i=0;i<encodedFormula.length;i++)
    {
      let asciiValue=encodedFormula[i].charCodeAt(0);
      if(asciiValue>=65 && asciiValue<=90)
      {
        let[prid,pcid]=decodeRIDCIDfromAddress(encodedFormula[i]);
        graphComponentMatrix[prid][pcid].pop();
      }
      // getting parent rid,cid to add rid,cid of children in graph matrix
      //remove last added children which form cycle
    }

}
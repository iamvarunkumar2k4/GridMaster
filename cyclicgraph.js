//for storage 
let graphComponentMatrix=[];

for(let i=0;i<rows;i++)
{
  let row=[];    //array is ued to detect cycle
  for(let j=0;j<columm;j++)
    {
      row.push([]);   //each node can have more than 1 children
    }
    graphComponentMatrix.push(row);
}

// function to check a cycle if form or not
function isGraphCyclic(graphComponentMatrix){
  //dependency -> visted,dfsvisted both 2d array
  let visted=[];   //node visit trace
  let dfsvisted=[];   //stack trace 
  for(let i=0;i<rows;i++)
  {
    let vistedrow=[];
    let dfsvistedrow=[];
    for(let j=0;j<columm;j++)
    {
      vistedrow.push(false);
      dfsvistedrow.push(false);
    }
    visted.push(vistedrow);
    dfsvisted.push(dfsvistedrow);
  }
  for(let i=0;i<rows;i++)
    {
      for(let j=0;j<columm;j++)
      { 
        let response=dfsCycleDetection(graphComponentMatrix,i,j,visted,dfsvisted);
        if(response ===true)
        {
          return true;
        }
      }
    }
    return null;
  
}

//start visted,dfsvisited-> both are true
// end dfvisited set to false
// if visted[i][j] == true then go back no need to explore
// cyclic condition if visted[i][j]==true && dfsvisted[i][j]==true then cycle formed
//srcr-> source row srcc-> source column
function dfsCycleDetection(graphComponentMatrix,srcr,srcc,visted,dfsvisted){
  visted[srcr][srcc]=true;
  dfsvisted[srcr][srcc]=true;
  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
    if (visted[nbrr][nbrc] === false) {
        let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visted, dfsvisted);
        if (response === true) return true; // Found cycle so return immediately, no need to explore more path
    }
    else if (visted[nbrr][nbrc] === true && dfsvisted[nbrr][nbrc] === true) {
        // Found cycle so return immediately, no need to explore more path
        return true;
    }
}
  dfsvisted[srcr][srcc]=false;
  return false;
}


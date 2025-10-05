 const elements = [];
    // 元素資料：包含原子序數、名稱、符號、原子量、週期、族、描述、電子殼層配置、圖片URL（圖片僅示意，非所有元素皆有）
    
    /*
    const elements = [
    // 1-氫 ~ 118-鿫
    {"num":1, "name":"氫", "symbol":"H", "mass":"1.008","type":1, "period":1, "group":1,"desc":"氫是最輕的元素，宇宙中最豐富的元素，主要組成恆星和水。","electron":"1s¹","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hydrogen_Spectrum.png/200px-Hydrogen_Spectrum.png"},
    {"num":2, "name":"氦", "symbol":"He", "mass":"4.0026","type":4, "period":1, "group":18,"desc":"氦為惰性氣體，無色無味，常用於低溫冷卻和氣球充氣。","electron":"1s²","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Helium_Spectra.jpg/200px-Helium_Spectra.jpg"},
    {"num":3,"name":"鋰","symbol":"Li","mass":"6.94","type":2,"period":2,"group":1,"category":"alkali","state":"solid","desc":"最輕的鹼金屬，用於電池和合金。","electron":"[He] 2s¹","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Lithium_sample.jpg/200px-Lithium_sample.jpg"},
    {"num":4,"name":"鈹","symbol":"Be","mass":"9.0122","type":3,"period":2,"group":2,"category":"alkaline-earth","state":"solid","desc":"輕鹼土金屬，常用於合金。","electron":"[He] 2s²","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Beryllium_sample.jpg/200px-Beryllium_sample.jpg"},
    {"num":5,"name":"硼","symbol":"B","mass":"10.81","type":5,"period":2,"group":13,"category":"metalloid","state":"solid","desc":"類金屬，半導體材料。","electron":"[He] 2s² 2p¹","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Boron-crystal-300x300pixels.png/200px-Boron-crystal-300x300pixels.png"},
    {"num":6,"name":"碳","symbol":"C","mass":"12.01","type":1,"period":2,"group":14,"category":"nonmetal","state":"solid","desc":"生命的基本元素。","electron":"[He] 2s² 2p²","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Diamond.jpg/200px-Diamond.jpg"},
    {"num":7,"name":"氮","symbol":"N","mass":"14.01","type":1,"period":2,"group":15,"category":"nonmetal","state":"gas","desc":"空氣中約78%的成分。","electron":"[He] 2s² 2p³","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Nitrogen_molecule.png/200px-Nitrogen_molecule.png"},
    {"num":8,"name":"氧","symbol":"O","mass":"16.00","type":1,"period":2,"group":16,"category":"nonmetal","state":"gas","desc":"生命呼吸必需氣體。","electron":"[He] 2s² 2p⁴","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Oxygen_molecule_3D.svg/200px-Oxygen_molecule_3D.svg.png"},
    {"num":9,"name":"氟","symbol":"F","mass":"18.998","type":6,"period":2,"group":17,"category":"halogen","state":"gas","desc":"最活潑的鹵素。","electron":"[He] 2s² 2p⁵","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fluorine-3D-vdW.png/200px-Fluorine-3D-vdW.png"},
    {"num":10,"name":"氖","symbol":"Ne","mass":"20.18","type":4,"period":2,"group":18,"category":"noble-gas","state":"gas","desc":"惰性氣體，用於燈具照明。","electron":"[He] 2s² 2p⁶","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Neon_discharge_tube.jpg/200px-Neon_discharge_tube.jpg"},
    ]
    //print(elements);
    */

    //fetch("./data.json")
    //fetch("../data/data.json")
    fetch("./data/data.json")
        .then(response => response.json())
        .then(data => {
            elements.push(...data);
            generateTable();
            //generateTableFromJSON(elements);
        // 用data生成週期表
    })
    .catch(err => console.error(err));
    //console.log(elements);
    //.console.log(fetch.path);



// 生成週期表格子，並定位元素
function generateTable() {
  const table = document.getElementById("periodicTable");
  // 週期表最大格 18列*7週期(含f區加延伸行)
  const totalRows = 10; // 7週期正排+2f周期格外行+空行
  const totalCols = 18;

  // 使用二維陣列配置週期表，初始填空白
  let grid = Array(totalRows).fill(null).map(() => Array(totalCols).fill(null));

  // 填入元素到grid位置 (period-1 為row index, group-1為column index)
  elements.forEach(el => {
    let r = el.period - 1;
    let c = el.group - 1;
    
    // f區單獨處理：
    // Lanthanides period 8 row (index 7)
    
    if (el.period === 6 && el.group === undefined) {
      // 自行介入f區放置（簡略）
      r = 7;
      c = el.num - 57; //假設從Lanthanide 57開始
    }
    
    // Actinides period 9 row (index 8)
    if (el.period === 7 && el.group === undefined) {
      r = 8;
      c = el.num - 89; 
    }
    
    grid[r][c] = el;
  });

  // 動態產生週期表HTML
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      let cell = document.createElement("div");
      if (row >=0 && row < 10) {
        // 主區域處理
        let el = grid[row][col];
        if (el) {
          cell.className = "element";
          cell.innerHTML = `<div class="element-number">${el.num}</div><div class="element-symbol">${el.symbol}</div><div class="element-name">${el.name}</div>`;
          cell.title = el.name + " (" + el.symbol + ")";
          if(el.type == 1)
            //cell.style.backgroundColor = "lightgreen";
            cell.style.backgroundColor = "#8CEA00";            
          else if(el.type == 2)
                 cell.style.backgroundColor = "orange";
                else if(el.type == 3)
                       //cell.style.backgroundColor = "yellow";
                       cell.style.backgroundColor = "#FFD306";
                      else if(el.type == 4)
                             //cell.style.backgroundColor = "purple";
                             cell.style.backgroundColor = "#9393FF";
                             //cell.style.borderColor = "royalblue";
                            else if(el.type == 5)
                                   //cell.style.backgroundColor = "green";
                                   cell.style.backgroundColor = "mediumseagreen";
                                   //cell.style.borderColor = "#9ACD32";
                                  else if(el.type == 6)
                                         //cell.style.backgroundColor = "cyan";
                                         cell.style.backgroundColor = "#66B3FF";
                                         //cell.style.borderColor = "#33CCFF";
                                        else if(el.type == 7)
                                               //cell.style.backgroundColor = "pink";
                                               cell.style.backgroundColor = "#FF7575";
                                              else if(el.type == 8)
                                                     //cell.style.backgroundColor = "gray";
                                                     cell.style.backgroundColor = "#AFAF61";
                                                    else if(el.type == 9)
                                                           //cell.style.backgroundColor = "lightblue";
                                                           cell.style.backgroundColor = "#6FB7B7";
                                                          else if(el.type == 10)
                                                                //cell.style.backgroundColor = "red";
                                                                //cell.style.backgroundColor = "#FF5809";
                                                                cell.style.backgroundColor = "#D9B300";

          cell.onclick = () => showDetail(el.num);
        } else {
          cell.className = "gap";
        }
      } else {
        // f元素行可特別設計
        cell.className = "gap";
      }
      table.appendChild(cell);
    }
  }
}
// 顯示元素詳情
function showDetail(num) {
  const el = elements.find(e => e.num === num);
  if (!el) return;
  document.getElementById("elementName").textContent = el.name + " (" + el.symbol + ")";
  document.getElementById("atomicNumber").textContent = el.num ;
  document.getElementById("chemicalSymbol").textContent = el.symbol;
  document.getElementById("atomicMass").textContent = el.mass;
  document.getElementById("description").textContent = el.desc;
  const img = document.getElementById("elementImage");
  if(el.img){
    img.src = el.img;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }
  document.getElementById("electronShells").innerHTML = el.electron.replace(/ /g,"<br>");
  document.getElementById("detailPanel").style.display = "block";
}
function hideDetail() {
  document.getElementById("detailPanel").style.display = "none";
}

document.querySelectorAll('.element-name').forEach(el => {
    const length = el.textContent.length;

    // 設定參數
    const maxSize = 100;   // 最大片字體 (百分比 %)
    const minSize = 30;    // 最小字體 (百分比 %)
    const factor  = 3;     // 每增加 1 個字，縮小多少 %

    // 計算字體大小 (百分比)
    let size = Math.max(minSize, maxSize - length * factor);

    el.style.fontSize = size + "px";
   el.style.fontWeight = "bold";
    el.style.color = "#555";
  });

// 啟動
//generateTable();
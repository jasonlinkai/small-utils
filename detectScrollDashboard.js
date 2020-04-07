let isAssignedDoctype = false;
let curType = "body";

function get_doctype() {
  const node = document.doctype;
  if (node === null) return '沒有指定DTD時，使用document.body系列';
  isAssignedDoctype = true;
  curType = "documentElement";
  return "<!DOCTYPE "
  + node.name
  + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
  + (!node.publicId && node.systemId ? ' SYSTEM' : '')
  + (node.systemId ? ' "' + node.systemId + '"' : '')
  + '>'
  + "指定DTD時，使用document.documentElement系列"
  ;
}


function get_random_number_from_ten_to_twenty() {
  return Math.round(Math.random() * 10) + 10;
}

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

function get_random_color() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function reload_dashboard() {
  const doctype = document.querySelector('#doctype');
  const scrollTop = document.querySelector("#scrollTop");
  const scrollHeight = document.querySelector("#scrollHeight");
  const clientHeight = document.querySelector("#clientHeight");
  const tips = document.querySelector("#tips");

  doctype.textContent = get_doctype();

  scrollTop.innerHTML = `
    <div>捲去的高度</div>
    <div>document.body.scrollTop: ${document.body.scrollTop}</div>
    <div>document.documentElement.scrollTop: ${document.documentElement.scrollTop}</div>
    <div>window.pageYoffset: ${window.pageYOffset}</div>
  `;

  scrollHeight.innerHTML = `
    <div>整頁高度</div>
    <div>document.body.scrollHeight: ${document.body.scrollHeight}</div>
    <div>document.documentElement.scrollHeight: ${document.documentElement.scrollHeight}<div>
  `;

  clientHeight.innerHTML = `
    視口高度
    <div>document.body.clientHeight: ${document.body.clientHeight}</div>
    <div>document.documentElement.clientHeight: ${document.documentElement.clientHeight}</div>
  `;

  tips.innerHTML = `
    <div>置底公式</div>
    <div>Math.abs(document${curType}.scrollHeight - document${curType}.scrollTop - document${curType}.clientHeight) <= 1</div>
  `;
  // <div>是否置底了？${Math.abs(document[curType].scrollHeight - document[curType].scrollTop - document[curType].clientHeight) <= 1 ? "是" : "否" }</div>
}


function createDiv() {
  return document.createElement('div');
}

function genDashboard() {
  const body = document.querySelector('body');
  const dashboard = createDiv();
  dashboard.id = "dashboard";
  body.appendChild(dashboard);

  dashboard.style.backgroundColor = "rgba(0,0,0,0.7)";
  dashboard.style.position = "fixed";
  dashboard.style.top = "0px";
  dashboard.style.left = "0px";
  dashboard.style.zIndex = "99999999";

  const dashboardNodeIds = ["doctype", "scrollTop", "scrollHeight", "clientHeight", "tips"];

  dashboardNodeIds.forEach((id) => {
    const node = createDiv();
    // const randomColor = get_random_color();
    // const invertRandomColor = invertHex(randomColor.slice(1, randomColor.length));
    // node.style.backgroundColor = randomColor;
    // node.style.color = "#" + invertRandomColor;
    node.style.color = "white";
    node.style.opacity = 1;
    node.id = id;
    dashboard.appendChild(node);
  });
}

function main() {
  genDashboard();

  reload_dashboard();

  window.addEventListener('scroll', reload_dashboard);
  window.addEventListener('resize', reload_dashboard);
}

window.addEventListener('load', main);

main();

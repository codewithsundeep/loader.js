let hts;
let sel = "body";
const defaultLoaderCss = `
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:10000;
    width:100%;
    height:100vh;
    background-color:#eeeef0;
    opacity:0.7;
    display:flex;
    align-items:center;
    justify-content:center;
    `;
const defaultLoaderCssElm = (s) => {
  let ht = document.querySelector(s);
  hts = ht.clientHeight;
  return `
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:100;
    width:${ht.clientWidth}px;
    height:${ht.clientHeight}px;
    background-color:#eeeef0;
    opacity:0.7;
    display:flex;
    align-items:center;
    justify-content:center;
    `;
};
const defaultSpinerCss = `
position:relative;
  border: 5px solid black;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  z-index:100000;
  width: 8px;
  height: 8px;
    `;
const defaultSpinerCssElm = () => {
  return `
position:relative;
  border: 3px solid black;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  z-index:100000;
  width: ${hts / 2}px;
  height: ${hts / 2}px;
    `;
};
const anim_loader_js = `    
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
    `;
function loader_random() {
  return Math.floor(Math.random() * 10000000000000000);
}
const loaderConfig = {
  background: defaultLoaderCss,
  spiner: defaultSpinerCss,
  animationConfig: anim_loader_js,
  animation: "spiner 0.5s linear infinite",
};
function createDefaultLoader() {
  console.log(arguments);
  if (arguments.length > 0) {
    loaderConfig.background = defaultLoaderCssElm(arguments[0]);
    sel = arguments[0];
    loaderConfig.spiner = defaultSpinerCssElm();
  }
  let rdm = loader_random();
  document.querySelector("head").innerHTML += `
  <style id="anim_loader_js" data-rem="rem_${rdm}">
  @keyframes ${(() => {
    let spt = loaderConfig.animation.split(" ");
    let spc = spt.splice(0, 1);
    let name = spc[0] + "_" + rdm;
    loaderConfig.spiner += "animation:" + name + " " + spt.join(" ") + ";";
    loaderConfig.spiner +=
      "-webkit-animation:" + name + " " + spt.join(" ") + ";";
    return name;
  })()} {
  ${loaderConfig.animationConfig}
  }
    @-webkit-keyframes ${(() => {
      let spt = loaderConfig.animation.split(" ");
      let spc = spt.splice(0, 1);
      let name = spc[0] + "_" + rdm;
      return name;
    })()} {
  ${loaderConfig.animationConfig}
  }
  </style>
  `;
  let em = document.createElement("div");
  em.setAttribute("id", "loader_js");
  em.setAttribute("style", loaderConfig.background);
  em.setAttribute("data-rem", `rem_${rdm}`);
  let spiner = document.createElement("div");
  spiner.setAttribute("id", "loader_js_spiner");
  spiner.setAttribute("style", loaderConfig.spiner);
  em.appendChild(spiner);
  document.querySelector(sel).appendChild(em);
  function finish() {
    if (arguments.length < 1) {
      Array.from(document.querySelectorAll(`[data-rem='rem_${rdm}']`)).map(
        (e) => e.remove()
      );
    } else {
      let tm = setTimeout(() => {
        Array.from(document.querySelectorAll(`[data-rem='rem_${rdm}']`)).map(
          (e) => e.remove()
        );
        clearTimeout(tm);
      }, parseInt(arguments[0]));
    }
  }
  return { finish: finish };
}

class Loader {
  constructor() {
    this.init = createDefaultLoader;
    this.animationName = "spin";
  }
}

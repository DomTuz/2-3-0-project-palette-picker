import './style.css'
import { v4 as uuidv4 } from 'uuid';
import '../package.json';
import {
    setPalette,
    getPalette,
    addPalette,
    removePalette,
    initializePalettesIfEmpty,
  } from './local-storage.js';


// const defaultPalettes = () => {
//     palettes.forEach(element => {
//       const li = document.createElement('li');
//       li.className = 'default-li';
    //   li.innerHTML = `
    //   <li>
    //     <h1>${element.title}</h1>
    //       <br>
    //       <div style="background: ${element.colors[0]}">Text Example</div>
    //       <button>Copy ${element.colors[0]}</button>
    //       <br>
    //       <div style="background: ${element.colors[1]}">Text Example</div>
    //       <button>Copy ${element.colors[1]}</button>
    //       <br>
    //       <div style="background: ${element.colors[2]}">Text Example</div>
    //       <button>Copy ${element.colors[2]}</button>
    //       <button>Delete</button>
    //       <div>${element.temperature}</div>
    //   </li>`;
    //     palettesList.append(li);
//     });
// };

const renderPalettes = () => {
  // Gets the palette
  const palettes = getPalette();
  console.log(palettes);

  // Clears out all palettes
  const paletteList = document.querySelector("#palettes-list");
  paletteList.innerHTML = "";

  // Renders each palette
  palettes.forEach((palette) => {
    const li = document.createElement('li');
    li.setAttribute("data-uuid", palette.uuid);
    paletteList.append(li);

    const h3 = document.createElement('h3');
    h3.textContent = palette.title;
    li.append(h3);

    const divColor1 = document.createElement('div');
    divColor1.textContent = 'Text Example';
    divColor1.style.background = palette.color1;
    li.append(divColor1);

    const copyButton1 = document.createElement('button');
    copyButton1.textContent = `Copy ${palette.color1}`;
    li.append(copyButton1);

    const divColor2 = document.createElement('div');
    divColor2.textContent = 'Text Example';
    divColor2.style.background = palette.color2;
    li.append(divColor2);

    const copyButton2 = document.createElement('button');
    copyButton2.textContent = `Copy ${palette.color2}`;
    li.append(copyButton2);

    const divColor3 = document.createElement('div');
    divColor3.textContent = 'Text Example';
    divColor3.style.background = palette.color3;
    li.append(divColor3);

    const copyButton3 = document.createElement('button');
    copyButton3.textContent = `Copy ${palette.color3}`;
    li.append(copyButton3);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Palette';
    deleteButton.classList.add('delete-button');
    li.append(deleteButton);

    const divTemp = document.createElement('div');
    divTemp.textContent = palette.temperature;
    divTemp.classList.add('temperature');
    if (palette.temperature === "Neutral"||"neutral") {
      divTemp.style.background = '#818589'
    } else if (palette.temperature === "Cool"||"cool") {
      divTemp.style.background = '#0047AB'
    } else if (palette.temperature === "Warm"||"warm") {
      divTemp.style.background = '#FF7251'
    };
    li.append(divTemp);
  });
}

const handleSubmit = (e) => {
  e.preventDefault();

  // Retrieves the user's data from the form and makes an object of it
  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  // Adds a uuid to the form Object
  formObj.uuid = uuidv4();

  // Adds new palette to the local storage
  addPalette(formObj);

  // Renders new palette 
  renderPalettes();

  form.reset();
}

const handleDelete = (e) => {
  e.target.name = 
  
  // Removes palette from local storage
  removePalette(uuid);

  // Removes palette from the DOM
  // .remove();

  // Clears and re-renders remaining palettes
  renderPalettes();
}

const main = () => {
  const form = document.querySelector("#palette-picker-form");
  form.addEventListener('submit', handleSubmit);

  const remove = document.querySelector("#palettes-list");
  remove.addEventListener('click', handleDelete);

  initializePalettesIfEmpty();
  renderPalettes();
}

main();
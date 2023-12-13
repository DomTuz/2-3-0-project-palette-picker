import palettes from './palettes.json';
import { v4 as uuidv4 } from 'uuid';

// Stores the value in local storage
const setLocalStorageKey = (key, value) => {
  // .stringify changes the value into a string 
  localStorage.setItem(key, JSON.stringify(value));
}

// Retrieves the value from local storage
const getLocalStorageKey = (key) => {
  try {
    // .parse changes the value back from a string into whatever data type it was before
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setPalette = (palette) => setLocalStorageKey('palettes', palette);

export const getPalette = () => getLocalStorageKey('palettes');

export const addPalette = (palette) => setPalette([...(getPalette()), palette]);

export const removePalette = (uuid) => {
  const newPalette = getPalette().filter((palette) => palette.uuid !== uuid);
  setPalette(newPalette);
};

export const initializePalettesIfEmpty = () => {
  if (!getPalette()) setPalette(palettes);
};

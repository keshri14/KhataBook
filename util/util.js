const fs = require('fs'); 
const loadKhata = () => {
    try {
        const dataBuffer = fs.readFileSync("./khata.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
      } catch (e) {
        return [];
      }
  };
  
  
  const saveKhata = (khata) => {
    const dataJSON = JSON.stringify(khata);
    fs.writeFileSync("./khata.json", dataJSON);
  };

  module.exports = {loadKhata,saveKhata}
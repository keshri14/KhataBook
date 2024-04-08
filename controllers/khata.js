//name, pendingAmount, date, mobileNo, address
const {loadKhata,saveKhata} = require("../util/util")


//add khata
const addKhataEntry = async (req,res) => {
    const khata = await loadKhata();
    const Khataid = req.body.id;
    const duplicate = khata.filter((item)=>{ 
    return item.id == Khataid;
    })
    if(duplicate.length>0){ 
    res.status(400).json({msg:"Please provide unique khata id"})
    }
    else{ 
    const entry = req.body;
    khata.push(entry);
    saveKhata(khata);
    res.status(200).json({msg:"khata has been added successfully",data:khata});
    }
  };


  //getAllKhata
  const listKhataEntries = async (req,res) => {
    const khata = await loadKhata();
    res.status(200).json({msg:"khata fetched successfully",data:khata})
  };

  //update khata  name, pendingAmount, date, mobileNo, address
  const updateKhataEntry = async(req,res) => {
    console.log("update khata exicuted")
    const khata = await loadKhata();
    const khataid = req.params.id;  //id
    const updatedKhata = khata.filter((item)=>item.id!=khataid);
    const newkhata = req.body;
    updatedKhata.push(newkhata);
    saveKhata(updatedKhata);
    res.status(200).json({msg:"khata has been updated successfully",data:updatedKhata})
  };

  //delete khata
  const deleteKhataEntry = async(req,res) => {
    console.log("delete khata exicuted")
    const khata = await loadKhata();
     const khataId = req.params.id;
     console.log(khataId)
     const newKhata = khata.filter((item)=>item.id!=khataId);
     saveKhata(newKhata);
     res.status(200).send({msg:"khata has been deleted successfully",data:newKhata})
  };

  //serach khata
  const searchKhataEntriesByName = async (req,res) => {
    const searchName = req.params.name; 
    const khata = await loadKhata();
    const searchResults = khata.filter(entry => entry.name.toLowerCase().includes(searchName.toLowerCase()));
    if (searchResults.length > 0) {
     res.status(200).json({msg:"found successfully",data:searchResults})
    } else {
     res.status(200).json({msg:"Khata Not found ( or Please provide correct name)",data:searchResults})
    }
  };

  //read khata
  const readKhataEntry =async (req,res) => {
    const {id} = req.params;
    const khata = await loadKhata();
    const readKhata = khata.filter((item)=>item.id==id);
    console.log(readKhata)
    if(readKhata){ 
        return res.status(200).json({msg:"khata readed successfully",data:readKhata})
    }
    else{ 
        res.status(400).json({msg:" Cannot read, something went wrong"})
    }
  };

  
module.exports = {
    addKhataEntry,
    listKhataEntries,
    updateKhataEntry,
    deleteKhataEntry,
    searchKhataEntriesByName,
    readKhataEntry
  };
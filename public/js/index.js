
console.log("index.js exicuted")

//search and add btn select
const searchE1 = document.getElementById('search');
const searchTextE1 = document.getElementById('searchTxt');
const addBtn = document.getElementById('addKhata');
const KhatasE1 = document.getElementById('khataContainer')

//model
const readModel = document.getElementById('readModel')
const overLay = document.getElementById('overlay')

searchE1.addEventListener('click',()=>{ 
  const name = searchTextE1.value;
  searchByName(name)
})


addBtn.addEventListener('click',()=>{ 
  overLay.style.display = 'block';
  readModel.style.display = 'block';
  readModel.innerHTML='';
  readModel.innerHTML=`
  <div class="Modelcard"> 
  <span id="closeModelRead"><i class="fa-solid fa-xmark"></i></span>
  <h3>Khata ID : <input type="text" id="CreateId"></h3>
  <h3>Name : <input type="text" id="CreateName"></h3>
  <h3>Pending Amt: <input type="number"  id="Createreadpending"></h3>
  <h3>Date : <input type="text" id="CreateDate"></h3>
  <h3>Mobile No : <input type="text" id="Createmobile"></h3>
  <h3>Address : <input type="text" id="CreateAddress"></h3>
  <button id="submitKhata">Click To Add Khata</button>
  </div>
  `;
  document.getElementById('closeModelRead').addEventListener('click',()=>{ 
    overLay.style.display = 'none';
    readModel.style.display = 'none';
  })
  document.getElementById('submitKhata').addEventListener('click',()=>{ 
    const id = document.getElementById('CreateId').value
    const name = document.getElementById('CreateName').value
    const pendingAmount = document.getElementById('Createreadpending').value
    const date = document.getElementById('CreateDate').value
    const mobileNo = document.getElementById('Createmobile').value
    const address = document.getElementById('CreateAddress').value
    if(id && name && pendingAmount && date && mobileNo && address){ 
     const data = { 
      id:id,
      name:name,
      pendingAmount:pendingAmount,
      date:date,
      mobileNo:mobileNo,
      address:address
     }
     addNewKhata(data)
    }
    else{ 
      alert("Please provide fill all input field")
    }
})
})



//addNewKhata
function addNewKhata(data){ 
  axios.post('/khata/v1',data).then((response)=>{ 
   overLay.style.display = 'none';
   readModel.style.display = 'none';
   fetchKhatas();
  }).catch((error)=>{ 
    alert('please provide unique id (already exits)')
    console.log(error)
  })

}


//fetch khata
function fetchKhatas() {
    axios
      .get("/khata/v1")
      .then((response) => {
        displayKhatas(response.data.data, true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fetchKhatas();

  function displayKhatas(khata,msg) {
    KhatasE1.innerHTML = "";
    if (khata.length === 0) {
      KhatasE1.innerHTML = `<h2 style="text-align:center; color:orange;">${
        msg ? "Empty Khata Book 🙅" : "No Khata Available with searched name ☹️"
      }</h2>`;
    } else {
      khata.forEach((book) => {
        KhatasE1.innerHTML += `<div class="card" id=${book.id}> 
        <h3>Name : <span>${book.name}</span></h3>
        <h3>Pending Amount : <span>Rs.${book.pendingAmount}</span></h3>
        <h3>Date : <span>${book.date}</span></h3>
        <h3>Mobile No : <span>${book.mobileNo}</span></h3>
        <h3>Address : <span>${book.address}</span></h3>
      </div>`;
    
      document.querySelectorAll('.card').forEach((cr)=>{ 
        cr.addEventListener('click',()=>{ 
        const khataID = cr.getAttribute('id');
        overLay.style.display = 'block';
        readModel.style.display = 'block';
        readKhata(khataID);
        })
      });
      });
      
    }
  }


  
  function readKhata(id){ 
    axios.get(`/khata/v1/${id}`).then((response)=>{ 
      const khata = response.data.data;
      readModel.innerHTML = '';
      readModel.innerHTML = `
      <div class="Modelcard" id=${khata[0].id}> 
       <span id="closeModelRead"><i class="fa-solid fa-xmark"></i></span>
        <h3>Khata ID : <input type="text" disabled value="${khata[0].id}" id="readId"></h3>
        <h3>Name : <input type="text" value="${khata[0].name}" id="readName"></h3>
        <h3>Pending Amt: <input type="number" value="${khata[0].pendingAmount}" id="readpending"></h3>
        <h3>Date : <input type="text" value="${khata[0].date}" id="readDate"></h3>
        <h3>Mobile No : <input type="text" value="${khata[0].mobileNo}" id="readmobile"></h3>
        <h3>Address : <input type="text" value="${khata[0].address}" id="readAddress"></h3>
        <div class="btns">
        <span class="updateBtn"><i class="fa-solid fa-pen" title="update Khata"></i></span>
        <span class="deleteBtn"><i class="fa-solid fa-trash" title="delete Khata"></i></span>
        </div>
      </div>`;
      document.querySelector('.deleteBtn').addEventListener('click',()=>{
        const khataID = document.querySelector('.Modelcard').getAttribute('id');
        deleteKhata(khataID)
      })
      document.getElementById('closeModelRead').addEventListener('click',()=>{ 
        overLay.style.display = 'none';
        readModel.style.display = 'none';
      })
      const readIdE1 = document.getElementById('readId')
      const readNameE1 = document.getElementById('readName')
      const readpendingE1 = document.getElementById('readpending')
      const readDateE1 = document.getElementById('readDate')
      const readmobileE1 = document.getElementById('readmobile')
      const readAddressE1 = document.getElementById('readAddress')

      document.querySelector('.updateBtn').addEventListener('click',()=>{
        const khataID = document.querySelector('.Modelcard').getAttribute('id');
        if(readNameE1.value && readpendingE1.value && readDateE1.value && readmobileE1.value && readAddressE1.value){ 
          const data={ 
            id:readIdE1.value,
            name:readNameE1.value,
            pendingAmount:readpendingE1.value,
            date:readDateE1.value,
            mobileNo:readmobileE1.value,
            address:readAddressE1.value
          }
          updateKhata(khataID,data);
        }
        else{ 
          alert("Please provide fill all input field")
          fetchKhatas()
        }
        
      })
    }).catch((error)=>{ 
      console.log(error)
    })
  }


  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      overLay.style.display = 'none';
      readModel.style.display = 'none';
    }
  });


  function deleteKhata(id){ 
  axios.delete(`/khata/v1/${id}`).then((response)=>{ 
    overLay.style.display = 'none';
    readModel.style.display = 'none';
    alert('Khata has been deleted Successfully')
    fetchKhatas();
  }).catch((error)=>{ 
    console.log(error)
  })
  }

  function updateKhata(id,data){ 
    axios.put(`/khata/v1/${id}`,data).then((response)=>{ 
      overLay.style.display = 'none';
      readModel.style.display = 'none';
      fetchKhatas();
      alert("Khata updated Successfully")
    }).catch((error)=>{ 
      console.log(error)
    })
  }


  //search by name

  function searchByName(name){ 
    let flag=0;
   if(name==''){ 
    alert("please provide search name");
    flag=1;
   }
   else{ 
    flag=0;
    axios.get(`/khata/v1/search/${name}`).then((response)=>{ 
    displayKhatas(response.data.data)
    }).catch((error)=>{ 
      console.log(error)
    })
   }
   if(flag){ 
    fetchKhatas()
   }
  }
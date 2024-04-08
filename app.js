// const yargs = require('yargs');
// const { addKhataEntry, listKhataEntries, updateKhataEntry, deleteKhataEntry, searchKhataEntriesByName,readKhataEntry } = require('./khata');

// const argv = yargs
//   .command({
//     command: 'entry',
//     describe: 'Add a new khata entry',
//     builder: { 
//       name: {
//         describe: 'Name of the person',
//         demandOption: true,
//         type: 'string'
//       },
//       pendingAmount: {
//         describe: 'Pending amount',
//         demandOption: true,
//         type: 'number'
//       },
//       date: {
//         describe: 'Date of the entry',
//         demandOption: true,
//         type: 'string'
//       },
//       mobileNo: {
//         describe: 'Mobile number',
//         demandOption: true,
//         type: 'number'
//       },
//       address: {
//         describe: 'Address',
//         demandOption: true,
//         type: 'string'
//       }
//     },
//     handler: function (argv) { 
//       addKhataEntry(argv.name, argv.pendingAmount, argv.date, argv.mobileNo, argv.address);
//     }
//   })
//   .command({
//     command: 'totalkhata',
//     describe: 'All khata entries',
//     handler: function () {
//       listKhataEntries();
//     }
//   })
//   .command({
//     command: 'update',
//     describe: 'Update a khata entry',
//     builder: {
//       index: {
//         describe: 'Index of the entry to update',
//         demandOption: true,
//         type: 'number'
//       },
//       name: {
//         describe: 'New name for the entry',
//         demandOption: true,
//         type: 'string'
//       },
//       pendingAmount: {
//         describe: 'New pending amount for the entry',
//         demandOption: true,
//         type: 'number'
//       },
//       date: {
//         describe: 'New date for the entry',
//         demandOption: true,
//         type: 'string'
//       },
//       mobileNo: {
//         describe: 'New mobile number for the entry',
//         demandOption: true,
//         type: 'number'
//       },
//       address: {
//         describe: 'New address for the entry',
//         demandOption: true,
//         type: 'string'
//       }
//     },
//     handler: function (argv) {
//       updateKhataEntry(argv.index, argv.name, argv.pendingAmount, argv.date, argv.mobileNo, argv.address);
//     }
//   })
//   .command({
//     command: 'delete',
//     describe: 'Delete a khata entry',
//     builder: {
//       index: {
//         describe: 'Index of the entry to delete',
//         demandOption: true,
//         type: 'number'
//       }
//     },
//     handler: function (argv) {
//       deleteKhataEntry(argv.index);
//     }
//   })
//   .command({
//     command: 'search',
//     describe: 'Search for khata entries by name',
//     builder: {
//       name: {
//         describe: 'Name to search for',
//         demandOption: true,
//         type: 'string'
//       }
//     },
//     handler: function (argv) {
//       searchKhataEntriesByName(argv.name);
//     }
//   })
//   .command({
//     command: 'read',
//     describe: 'Read a khata entry by index',
//     builder: {
//       index: {
//         describe: 'Index of the entry to read',
//         demandOption: true,
//         type: 'number'
//       }
//     },
//     handler: function (argv) {
//       readKhataEntry(argv.index);
//     }
//   })
// yargs.parse()


// -------------express server-------------
const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 4000;
const hbs = require('hbs');
const khataRoutes = require('./routers/khata')

//static files
const publicDirectory = path.join(__dirname, "/public");
const viewPath = path.join(__dirname, "/public/views");
const partialPath = path.join(__dirname, "/partials");
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectory));

app.use(express.json());
app.use("/khata/v1", khataRoutes);

//request----
app.get("/", (req, res) => {
  res.render("index", {
    userName: "akash",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    about: "this message is for temporary",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    userName: "akash",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    userName: "akash",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    msg: "Resouce does not exists",
  });
});

app.listen(port,()=>{ 
  console.log(`server is listening at port ${port}...`)
})

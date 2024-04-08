const express = require('express');
const router = express.Router()
const {addKhataEntry,listKhataEntries,updateKhataEntry,deleteKhataEntry,searchKhataEntriesByName,readKhataEntry} = require('../controllers/khata')

router.route('/').get(listKhataEntries).post(addKhataEntry);
router.route('/:id').get(readKhataEntry).delete(deleteKhataEntry).put(updateKhataEntry)
router.route('/search/:name').get(searchKhataEntriesByName)

module.exports = router;

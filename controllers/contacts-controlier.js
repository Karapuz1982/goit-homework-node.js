
import * as contactsService from "../models/index.js";
import { HttpError } from "../helpers/index.js";
import {ctrlWrapper} from "../decorators/index.js"




const getAll = async (req, res) => {
   
        const result = await contactsService.listContacts();
        res.json(result);
   
};

const getById = async (req, res) => {
   
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Contact with ${id} not found `)
        }
        res.json(result);
    
};


const add = async (req, res) => {
   
       
        const result = await contactsService.addContact(req.body);
        res.status(201).json(result);
   
};


const updateById = async (req, res) => {
   
       
       
  
        const { contactId } = req.params;
        const result = await contactsService.updateContactById(contactId, req.body);
        if (!result) {
            throw HttpError(404, `Contact with ${contactId} not found`);
        }
        res.json(result);
   
};

const deleteById = async (req, res) => {
 
        const { contactId } = req.params;
        const result = contactsService.removeContact(contactId);
        if (!result) {
            throw HttpError(404, `Movie with ${contactId} not found`);
        }
        res.json({
            "message": "contact deleted"
        })

   
};

export default {
getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),




}





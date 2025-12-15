const mongoose = require('mongoose');

const schema = mongoose.Schema({
    role_id: {type: mongoose.SchemaTypes.ObjectId, request: true},
    created_by: {type: mongoose.SchemaTypes.ObjectId, request: true},
    permission: {type:String, request: true}
},{
    versionKey: false, 
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }  
})

class RolePrivileges extends mongoose.Model {
    
}

schema.loadClass(RolePrivileges);
module.exports = mongoose.model("role_privileges", schema);
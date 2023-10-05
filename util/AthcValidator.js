const AJV = require('ajv');
const ajv = new AJV();
// const valid=require('validator')



const schema ={
    "type":"object",
    "properties":{
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+",
        },
        "password":{
            "type":"string",
            "minLength":5,
            "maxLength":40
        }
        
},
"required":["email","password"]
};



module.exports = ajv.compile(schema);

// const validate = ajv.compile(schema);
// module.exports = validate;

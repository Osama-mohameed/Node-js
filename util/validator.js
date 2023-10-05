
const AJV = require('ajv');

const schema = {
    type: "object",
    properties: {
        fn: {
            "type": "string",
            "minLength": 2,
            "maxLength": 9,
            "pattern":"^[A-Z][a-z]*$"
        },
        ls:{
            'type': 'string',
            "minLength": 2,
            "maxLength": 9
        },
        dept: {
            type: "string",
            "minLength": 2,
            "maxLength": 3
        },
    
        
    },
    required: ['fn','ls'],
    additionalProperties: true,
};


var ajv = new AJV();
const validate = ajv.compile(schema);

module.exports=validate;
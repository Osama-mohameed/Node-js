const AJV = require("ajv");
const ajv = new AJV();

const schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string", "pattern": "^[A-Z][a-z]*$" },
        "email": { "type": "string","pattern":".+\@.+\..+"},
        "password": { "type": "string", "minLength": 2 },
    
    },
    "required": ["name", "email", "password"]

}



// const validate = ajv.compile(schema);
// module.exports = validate;

module.exports = ajv.compile(schema);

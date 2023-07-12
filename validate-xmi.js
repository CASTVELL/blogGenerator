const DOMParser = require('xmldom').DOMParser;
const Validator = require('xsd-schema-validator');

// Ruta al archivo XSD que define el esquema
const xsdPath = 'ruta/al/esquema.xsd';

// Ruta al archivo XMI que deseas validar
const xmiPath = 'ruta/al/documento.xmi';

// Lee el contenido del archivo XMI
const xmiContent = fs.readFileSync(xmiPath, 'utf-8');

// Crea un objeto DOMParser para analizar el XMI
const parser = new DOMParser();

// Analiza el contenido del XMI y obtén el documento DOM
const document = parser.parseFromString(xmiContent, 'application/xml');

// Valida el documento XMI contra el esquema XSD
Validator.validateXML(document, xsdPath)
    .then((result) => {
        if (result.valid) {
            console.log('El XMI es válido según el esquema.');
        } else {
            console.log('El XMI no cumple con el esquema:');
            console.log(result.messages);
        }
    })
    .catch((error) => {
        console.error('Error al validar el XMI:', error);
    });

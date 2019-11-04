const createSpecification = require('./createSpecification');
const parseApiFile = require('./parseApiFile');
const convertGlobPaths = require('./convertGlobPaths');
const finalizeSpecificationObject = require('./finalizeSpecificationObject');
const updateSpecificationObject = require('./updateSpecificationObject');

function getSpecificationObject(options) {
  // Get input definition and prepare the specification's skeleton
  const definition = options.swaggerDefinition || options.definition;
  const specification = createSpecification(definition);

  // Parse the documentation containing information about APIs.
  const apiPaths = convertGlobPaths(options.apis);

  for (let i = 0; i < apiPaths.length; i += 1) {
    let parsedFile = parseApiFile(apiPaths[i]);
    if(options.onParseFileContent) {
      parsedFile = options.onParseFileContent(apiPaths[i], parsedFile);
    }
    updateSpecificationObject(parsedFile, specification);
  }

  return finalizeSpecificationObject(specification);
}

module.exports = getSpecificationObject;

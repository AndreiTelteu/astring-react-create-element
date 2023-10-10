import { GENERATOR } from 'astring';

/**
 * Add JSX generators to astring default generator, or your custom generator
 * @example
 * import astringReactCreateElement from 'astring-react-create-element';
 * import * as astring from 'astring';
 * 
 * const formattedCode = astring.generate(ast, {
 *     generator: astringReactCreateElement(astring.GENERATOR),
 * });
 */
declare function astringReactCreateElement(generator: GENERATOR): GENERATOR;

export default astringReactCreateElement;

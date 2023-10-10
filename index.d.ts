import { GENERATOR } from 'astring';

/**
 * Add JSX generators to astring default generator, or your custom generator
 * @example
 * import astringReactCreateElement from './astring-react-jsx';
 * import { GENERATOR } from 'astring';
 * 
 * const formattedCode = astring.generate(ast, {
 *     generator: astringReactCreateElement(GENERATOR),
 * });
 */
declare function astringReactCreateElement(generator: GENERATOR): GENERATOR;

export default astringReactCreateElement;

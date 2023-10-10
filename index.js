
/**
 * Add JSX generators to astring default generator, or your custom generator
 * @example
 * import astringReactCreateElement from 'astring-react-create-element';
 * import { GENERATOR } from 'astring';
 * 
 * const formattedCode = astring.generate(ast, {
 *     generator: astringReactCreateElement(GENERATOR),
 * });
 */
export default function astringReactCreateElement(generator = {}) {
    const astringJsxGenerator = Object.assign({}, generator, {
        JSXAttribute: (node, state) => {
            if (node.value === null) return true;
            try {
                astringJsxGenerator?.[node.value.type]?.(node.value, state);
            } catch (e) {
                console.error(e.message, {e});
            }
        },
        JSXExpressionContainer: (node, state) => {
            if (node.expression.type == 'JSXEmptyExpression') return state.write('undefined');
            state.write('(');
            try {
                astringJsxGenerator?.[node.expression.type]?.(node.expression, state);
            } catch (e) {
                console.error(e.message, {e});
                state.write('null');
            }
            state.write(')');
        },
        JSXText: (node, state) => {
            const str = (''+node.raw).replace(/\n/g, '').replace(/\s+/g, ' ').trim();
            state.write(str && str != '' ? '"'+str+'"' : 'null');
        },
        JSXFragment: (node, state) => (astringJsxGenerator['JSXElement'](node, state)),
        JSXElement: (element, state) => {
            var indent = state.indent.repeat(state.indentLevel++);
            const parseName = (element) => {
                if (element.type === 'JSXIdentifier') { return element.name }
                return `${parseName(element.object)}.${parseName(element.property)}`
            }
            const { children: childNodes = [] } = element
            const openingTag = element.type === 'JSXElement'
                ? element.openingElement
                : element.openingFragment;
            const { attributes = [] } = openingTag
            const name = element.type === 'JSXElement'
                ? parseName(openingTag.name)
                : 'React.Fragment';
            
            state.write(`React.createElement(${name}, `);
            astringJsxGenerator?.['ObjectExpression']?.({
                type: 'ObjectExpression',
                start: 100,
                end: 200,
                properties: attributes.map(item => (
                    item.type == 'JSXSpreadAttribute' ? {
                        ...item,
                        type: 'SpreadElement',
                    } : {
                        ...item,
                        type: 'Property',
                        method: false,
                        shorthand: false,
                        computed: false,
                        kind: 'init',
                        key: {
                            ...item.name,
                            type: 'Identifier',
                        },
                    }
                )),
            }, state);
            
            childNodes.forEach(node => {
                state.write(",\n"+indent);
                try {
                    astringJsxGenerator?.[node.type]?.(node, state);
                } catch (e) {
                    console.error(e.message, {e});
                    state.write('React.createElement(Text, {}, "'+e.message+'")\n'+indent);
                }
            })
            state.write(')');
        },
    });
    return astringJsxGenerator;
}


## Generate `React.createElement()` code from JSX AST with astring

Credits to [TroyAlford/react-jsx-parser](https://github.com/TroyAlford/react-jsx-parser)
for parts of the code and thanks to [Qard/astring-jsx](https://github.com/Qard/astring-jsx) for inspiration


1. Why use this plugin instead of astring-jsx or other options ?
<br />This plugins generates React.createElement that are compatible with React-Native.

## Usage

Example with astring default generator:
```jsx
import astringReactCreateElement from './astring-react-jsx';
import { GENERATOR } from 'astring';

const formattedCode = astring.generate(ast, {
    generator: astringReactCreateElement(GENERATOR),
});
```

Example with custom generator:
```jsx
import astringReactCreateElement from './astring-react-jsx';
import { GENERATOR } from 'astring';

const customGenerator = Object.assign({}, astringReactCreateElement(GENERATOR), {
    JSXFragment: (node, state) => {
        customGenerator['JSXElement'](node, state);
    },
});
const formattedCode = astring.generate(ast, {
    generator: customGenerator,
});
```

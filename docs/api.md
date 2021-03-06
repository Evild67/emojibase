# API

What kind of emoji database would this be without a few helper functions for easily using and
working with emoji characters? A bad one, and thus, a handful of functions can be found in the
`emojibase` package.

```
yarn add emojibase
// Or
npm install emojibase --save
```

## fetchFromCDN

`fetchFromCDN<T>(path: string, version?: string, options?: FetchFromCDNOptions): Promise<T[]>`

This function will fetch `emojibase-data` JSON files from our
[CDN](https://cdn.jsdelivr.net/npm/emojibase-data@latest/), parse them, and return an array of emoji
objects. It requires a file path relative to the `emojibase-data` package as the 1st argument, the
Emojibase release version as the 2nd argument (defaults to the latest), and an object of options to
pass to `fetch` as the 3rd argument.

```javascript
import { fetchFromCDN, flattenEmojiData } from 'emojibase';

fetchFromCDN('ja/compact.json', '2.1.3').then(flattenEmojiData);
```

> Only JSON datasets can be fetched from the CDN.

> Successfully fetched data will be cached in session storage. If `local` is passed as an option,
> local storage will be used instead. Be sure to invalidate manually if used!

## flattenEmojiData

`flattenEmojiData(data: Emoji[]): Emoji[]`

By default, emoji [skin modifications are nested](./data.md#data-structure) under the base neutral
skin tone emoji. To flatten the data into a single dimension array, use the `flattenEmojiData`
function.

```javascript
import { flattenEmojiData } from 'emojibase';

flattenEmojiData([
  {
    hexcode: '1F3CB-FE0F-200D-2642-FE0F',
    // ...
    skins: [
      {
        hexcode: '1F3CB-1F3FB-200D-2642-FE0F',
        // ...
      },
      // ...
    ],
  },
]);

/*
[
  {
    hexcode: '1F3CB-FE0F-200D-2642-FE0F',
    // ...
  },
  {
    hexcode: '1F3CB-1F3FB-200D-2642-FE0F',
    // ...
  },
]
*/
```

> Tags from the parent emoji will be passed down to the skin modifications.

## fromCodepointToUnicode

`fromCodepointToUnicode(codepoint: CodePoint[]): Unicode`

This function will convert an array of numerical codepoints to a literal emoji Unicode character.

```javascript
import { fromCodepointToUnicode } from 'emojibase';

fromCodepointToUnicode([128104, 8205, 128105, 8205, 128103, 8205, 128102]); // 👨‍👩‍👧‍👦
```

## fromHexcodeToCodepoint

`fromHexcodeToCodepoint(code: Hexcode, joiner?: string): CodePoint[]`

This function will convert a hexadecimal codepoint to an array of numerical codepoints. By default,
it will split the hexcode using a dash, but can be customized with the 2nd argument.

```javascript
import { fromHexcodeToCodepoint } from 'emojibase';

fromHexcodeToCodepoint('270A-1F3FC'); // [9994, 127996]
fromHexcodeToCodepoint('270A 1F3FC', ' '); // [9994, 127996]
```

## fromUnicodeToHexcode

`fromUnicodeToHexcode(unicode: Unicode, strip?: boolean): Hexcode`

This function will convert a literal emoji Unicode character into a dash separated hexadecimal
codepoint. Unless `false` is passed as the 2nd argument, zero width joiner's and variation selectors
are removed.

```javascript
import { fromUnicodeToHexcode } from 'emojibase';

fromUnicodeToHexcode('👨‍👩‍👧‍👦'); // 1F468-1F469-1F467-1F466
fromUnicodeToHexcode('👨‍👩‍👧‍👦', false); // 1F468-200D-1F469-200D-1F467-200D-1F466
```

## generateEmoticonPermutations

`generateEmoticonPermutations(emoticon: Emoticon, options?: PermutationOptions): Emoticon[]`

This function will generate multiple permutations of a base emoticon character. The following
permutations will occur:

- `)` mouth will be replaced with `]` and `}`. The same applies to sad/frowning mouths.
- `/` mouth will be replaced with `\`.
- `:` eyes will be replaced with `=`.
- Supports a `-` nose, by injecting between the eyes and mouth.
- Supports both uppercase and lowercase variants.

```javascript
import { generateEmoticonPermutations } from 'emojibase';

generateEmoticonPermutations(':)'); // =-), =-}, :-], =-], :-}, :-), =}, =], =), :}, :], :)
```

> The base emoticon must follow a set of [naming guidelines](./emoticonds.md) to work properly.

Furthermore, this function accepts an options object as the 2nd argument, as a means to customize
the output.

- `isFace` (bool) - Toggles face permutations (mouth and eye variants). Defaults to `true`.
- `withNose` (bool) - Toggles nose inclusion. Defaults to `true`.

```javascript
generateEmoticonPermutations(':)', { withNose: false }); // =}, =], =), :}, :], :)
generateEmoticonPermutations('\\m/', { isFace: false }); // \m/, \M/
```

## stripHexcode

`stripHexcode(hexcode: Hexcode): Hexcode`

This function will strip zero width joiners (`200D`) and variation selectors (`FE0E`, `FE0F`) from a
hexadecimal codepoint.

```javascript
import { stripHexcode } from 'emojibase';

stripHexcode('1F468-200D-2695-FE0F'); // 1F468-2695
```

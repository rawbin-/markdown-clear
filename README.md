###  Table Of Contents
+ [Instruction](#intro)
+ [Installation](#install)
+ [Usage](#use)


### Instruction
`markdown-clear` is a NodeJS tool to automatic order the markdown headers to make it clear to read,especially on long document.

### Installation
use npm:
```
npm install markdown-clear -g
```
or use yarn
```
yarn add markdown-clear -g
```

### Usage
+ transform a single file
```
markdown-clear test.md test-out.md
```
+ update the content of the same file
```
markdown-clear test.md --force
```

+ transform a directory
```
markdown-clear test-dir test-dir-out
```

+ transform a directory and it's sub-directories
```
markdown-clear test-dir test-dir-out -r
```

+ update files in a directory
```
markdown-clear test-dir --force
```

+ update files in a directory and it's sub-directories
```
markdown-clear test-dir --force -r
```
### Language(语言选择)
English     [中文](./README-zh_CN.md)

###  Table Of Contents
+ [Instruction](#intro)
+ [Installation](#install)
+ [Usage](#use)


### Instruction
`markdown-clear` is a NodeJS tool to automatic order the markdown headers to make it clear to read,especially on long document.
+ example
```
#     ->    # 1
##    ->    ## 1.1
##    ->    ## 1.2
###   ->    ### 1.2.1
###   ->    ### 1.2.2
#     ->    # 2
##    ->    ## 2.1
```
+ you are not forced to use h1,but with the most stronger head on the first.
```
###     ->    ### 1
####    ->    #### 1.1
####    ->    #### 1.2
#####   ->    ##### 1.2.1
###     ->    ### 2
####    ->    #### 2.1
```

### Installation
use npm:
```
npm install markdown-clear -g
```
or use yarn
```
yarn global add markdown-clear
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
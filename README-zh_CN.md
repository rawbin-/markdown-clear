### 语言选择(Language)
中文      [English](./README.md)

###  目录
+ [简介](#intro)
+ [安装](#install)
+ [使用](#use)


### 简介
`markdown-clear` 用来对markdown标题进行多级编号的工具，让markdown文档看起来更清晰.

+ 样例
```
#     ->    # 1
##    ->    ## 1.1
##    ->    ## 1.2
###   ->    ### 1.2.1
###   ->    ### 1.2.2
#     ->    # 2
##    ->    ## 2.1
```
+ 不要求第一级标题只能是h1,但放在第一个的标题需要是当前文档最大的标题
```
###     ->    ### 1
####    ->    #### 1.1
####    ->    #### 1.2
#####   ->    ##### 1.2.1
###     ->    ### 2
####    ->    #### 2.1
```

### 安装
+ 使用 `npm`:
```
npm install markdown-clear -g
```
+ 使用 `yarn`
```
yarn global add markdown-clear
```

### 使用方法
+ 转换单个文件
```
markdown-clear test.md test-out.md
```
+ 直接更新原文件的内容
```
markdown-clear test.md --force
```

+ 转换整个目录
```
markdown-clear test-dir test-dir-out
```

+ 转换整个目录及其子目录
```
markdown-clear test-dir test-dir-out -r
```

+ 直接更新目录下的文件
```
markdown-clear test-dir --force
```

+ 直接更新目录及其子目录下的文件
```
markdown-clear test-dir --force -r
```
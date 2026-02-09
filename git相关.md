#### 查看当前大小写敏感设置

git config core.ignorecase
输出 true：表示大小写不敏感
输出 false：表示大小写敏感

#### 设置提交信息编码格式

git commit -m 提交信息时无法输入中文，是编码配置的问题
设置提交信息编码为 utf-8
git config --global i18n.commitencoding utf-8

#### cherry-pick

```js
// cherry-pick具体用法
/**
 * 1. 找到你想“挑选”的提交的 commit hash（如 abc1234）。git log 查看提交历史。
 * 2. 执行 cherry-pick 命令： 如 git cherry-pick abc1234
 * 这样，abc1234 这个提交的更改就会被复制到当前分支，并生成一个新的提交。
 * 4.
 * 如果有冲突，Git 会提示你解决冲突。解决后：
 * git add .
 * git cherry-pick --continue
 *
 * 如果想中断本次cherry-pick
 * git cherry-pick --abort
 *
 */

// 举个例子
test分支原本
1. X文件的前三行内容为：
旧1
旧2
旧3

2. 现在有两个提交：
b提交改了X文件第二行改为新2，
然后是c提交改了X文件第三行新3，
此时test分支的X文件内容为：
旧1
新2
新3

3. 我的dev分支
有一次a提交，改了a文件第一行改为新1，此时dev分支的X文件内容为：
新1
旧2
旧3

4. 此时切换到分支test
执行命令：git cherry-pick a提交的hash
那么X文件的内容为
新1
新2
新3
如果有冲突，也只会是专注于第一行的冲突，其他行还是会保留test分支的鸳鸯

// 总结：cherry-pick 只是把dev分支单词commit的改动内容合并过来，其余的代码还是用test分支的，相比传统的merge，只是缩小了冲突范围，影响更小，但是前提是 只能有一个commit，cherry-pick才会比merge更加实用
```

#### 配置开发分支合并主分支时。即 git merge 的时候打开 vim 看看自己本次到底修改了什么

git config --local merge.edit true 设置
git config --local --get merge.edit 查看设置

#### git 命令

cherry pick

#### 两种代码回退方式

1. git reset
   git reset --soft B：只回退 commit，代码内容还在（C、D 的更改会留在暂存区，无需 git add ，commit 消失）。
   git reset --mixed B（默认）：回退 commit（C、D 的更改会留在工作区，需要 git add），代码内容还在工作区（未提交的更改还在）。
   git reset --hard B：回退 commit、暂存区和工作区，C、D 的所有更改和代码都被彻底清除，什么都不剩。

2. git revert

- 例子一：

C 提交里新增了变量 a。
D 提交里用到了变量 a。
你现在 git revert C，生成了 E 提交，E 会把 C 的更改（比如新增变量 a）“反做”，也就是把变量 a 删除。
“反做”指定提交，意思是：把某个 commit（提交）里做的所有更改，全部反向操作一遍。
举例说明：

如果 C 提交是“新增变量 a”，那么“反做”就是“删除变量 a”。
如果 C 提交是“把变量 b 的值从 1 改成 2”，那么“反做”就是“把变量 b 的值从 2 改回 1”。
如果 C 提交是“删除了一行代码”，那么“反做”就是“把那行代码加回来”。

- 例子二：

如果你 git revert a 时，a 的改动和后续的 b、c 有冲突，Git 会在生成新提交（d）时提示冲突，需要你手动解决冲突。

处理流程如下：

执行 git revert a，遇到冲突后，Git 会暂停操作，并标记冲突文件。
你需要手动编辑冲突文件，解决冲突。
解决后，执行 git add . 标记已解决。
最后执行 git revert --continue 完成 revert 操作，生成新提交。

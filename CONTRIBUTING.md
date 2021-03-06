# Contributing
This project is single-handedly developed by me, Nefomemes, there's no other maintainers helping me developing this huge project.

So of course, contributions will always be appreciated. In this documentation, I'm just gonna dump everything you need in order to get start coding this thing.

## Adding changes in your local machine

<details>
  
  <summary>Open this</summary>
  
### Things you need to prepare

- Your preferred text editor
- Your preferred terminal
- The latest version of Git
- The latest version of Node.js

For the text editor itself, I myself preferred [Visual Studio Code](https://github.com/microsoft/vscode), or if you want the Code OSS experience (that's the open source version of VSC) you can check out [VSCodium](https://github.com/VSCodium/vscodium). If you want something else, there are [Sublime Text](https://www.sublimetext.com/) and Notepad++, heck you can even use [Vim](https://github.com/vim/vim). 


## Start adding changes to this wrapper

### Step 1: Fork this repo and clone it from Git



Alright, the first thing you need is a fork repository of this repo. If you haven't yet already, [you can just click this to fork this repo](https://github.com/Nefomemes/battlelog.js/fork).


  
After than we need to clone that fork repo into your local machine. Ignore this and move to Step 2 if you have cloned the fork repository.

```bash
git clone https://github.com/YOUR_USERNAME/battlelog.js.git
```

Do **not** add `/` to the end of the URL. This can cause an error when pushing back the changes later on.

If you are using a Git client then you can do stuff in your Git client. But of courfe. if you have Git CLI in your machine, you can run that command in your terminal and it should get displayed in your Git client as well.

### Step 2: 

If you have set the commit author globally in the past, you should skip this and continue to Step 3.

In this step, you are setting up the commit author username and email that will be registered with future commits.

Note: The email you use will be public. So don't use your main email if you are a paranoid guy who doesn't want your email to be leaked. Also, GitHub requires author emails to have a GitHub account associated with it. So if you have't already, add the author email to your GitHub account.  

**Set it globally, so that you won't need to do this again in the future when you are doing another projects**
```bash

git config --global user.name "YOUR_NAME"
git config --global user.email "MY_NAME@example.com"
```

**Set it locally, you will have to redo this step again in another projects**

```bash
git config user.name "YOUR_NAME"
git config user.email "MY_NAME@example.com"
```

Verify your configuration by displaying your configuration file:
```bash
cat .git/config
```

### Step 3: Make changes

Now you should be able to edit the files in your machine. Open the repo folder in your preffered text editor. And do your stuff. Move to Step 4 once you are done.

### Step 4: Stage, commit, and push.

```bash
git commit -am "commit_type: changes"
git push
```

Also, it is recommed to follow our commit ettique. Check out [Commit Ettique]() for more.

</details>

## Commit Ettique






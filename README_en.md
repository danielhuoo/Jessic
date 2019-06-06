# Jessic

A NetEase music player based on Vue

语言：[Chinese](README.md) | English

This is an online music player of Desktop, whose data is fetched from NetEase Music. The Api interfaces are provided by [API](https://github.com/Binaryify/NeteaseCloudMusicApi).

You can have a look at [Demo](http://35.242.163.122/).

## Interface

![login.png](http://psb5eq4ez.bkt.clouddn.com/Jessic/login.png)

![main.png](http://psb5eq4ez.bkt.clouddn.com/Jessic/main.png)

This project is for practicing Vue. It takes me about two weeks. Although there are not many functions implemented, they are also complex and critical functions, including song playback, song selection, and switching song lists.

Used technology stack：Vue, Vuex, Vue-router, elementUI, axios, sass.

It is worth mentioning that this is the first time that I introduced Vuex in the project, which is very different from previous development thinking. It feels pretty good. You can look at the structure of `store`.

The currently known bugs are:

1. Playing a song will throw a DOM exception, but it will not affect the playback effect.
2. After switching the song list, the song list is not well rendered, but does not affect playback.
3. After logging in for a certain period of time, the song will not be played. I think it is related to the login status expiration time. Need to refresh the page or log in again.
4. Lack of test samples, resulting in most abnormal conditions not being processed
5. Songs cannot be played on Safari.

Late outlook:
1. It is possible to integrate the api interface into the project to avoid deploying a set of API services.
2. It may be rewritten as the SSR architecture
3. It is highly possible to use Electron to package it into an App to run on a Mac or Linux
4. I will add search, lyrics, songs, additions and deletions, MV and other functions.
5. May use Typescript for refactoring

This project is my personal project. I will continually update and add new features and optimizations.
Anyway, this project is for practice purposes, so it is impossible to be perfect. 

## setup
```
npm install
```

### run
```
npm run serve
```

### build
```
npm run build
```
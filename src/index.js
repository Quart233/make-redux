import feux from './fuex'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
// 更新流程: dispatch 触发 reducer 拷贝原 state 对象结构覆盖原有属性 将更新后的对象返回 触发 subscribe 对比 state 对象是否有变化 有更新 无则不更新

// function createStore(reducer) {
//     let state = null
//     const listeners = []
//     const subscribe = (listener) => listeners.push(listener)
//     const getState = () => state
//     const dispatch = (action) => {
//         state = reducer(state, action)
//         listeners.forEach((listener) => listener())
//     }
//     dispatch({}) // 初始化 state
//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// }

function renderApp(newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
    if (newAppState === oldAppState) return // 数据没有变化就不渲染了
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return // 数据没有变化就不渲染了
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
    if (newContent === oldContent) return // 数据没有变化就不渲染了
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

// let appState = {
//     title: {
//         text: 'React.js 小书',
//         color: 'red',
//     },
//     content: {
//         text: 'React.js 小书内容',
//         color: 'blue'
//     }
// }

function reducer(state, action) {
    if(!state) {
        return {
            title: {
                text: 'React.js 小书',
                color: 'red',
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        }
    }

    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return { // 构建新的对象并且返回
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return { // 构建新的对象并且返回
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state // 没有修改，返回原来的对象
    }
}

const store = feux.createStore(reducer)
let oldState = store.getState() // 缓存旧的 state

// 修改完成后的回调
store.subscribe(() => {
    console.log('旧', oldState)
    const newState = store.getState() // 数据可能变化，获取新的 state
    console.log('新', newState)
    renderApp(newState, oldState) // 把新旧的 state 传进去渲染
    oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
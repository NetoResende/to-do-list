
import { Header } from './components/header/Header.jsx'
// import './App.css'
import style from './App.module.css'
import { MainList } from './components/main/MainList.jsx'

export function App() {
  

  return (
    <div className={style.app}>
      <Header/>
      <MainList/>
    </div>
  )
}

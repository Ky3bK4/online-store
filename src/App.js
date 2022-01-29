import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import {fetchTypes} from "./http/deviceApi";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchTypes().then(response => {console.log(response)})
    check().then(data=>{
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(()=>setLoading(false))
  },[])

  if(loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <div className="App">
      <NavBar/>
      <AppRouter />
    </div>
  );
})

export default App;

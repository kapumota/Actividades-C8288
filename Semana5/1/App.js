import React from 'react';
class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      name:"Kapu", }
this.updateNameState=this.updateNameState.bind(this);
}
  updateNameState(){
    this.setState({
      name:"Kapu Mota"});
  }
render()
  {
    return(
    <div>
    <p>{this.state.name}</p>
    <button onClick={()=>this.updateNameState()}>Muestra el nombre completo</button>
    </div>
      );
  }
}
 export default App;

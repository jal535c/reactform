import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  
  nombreRef = React.createRef();
  emailRef = React.createRef();
  

  constructor(props){
    super(props);

    this.state = {
      users: [],
      edit: 'off',
      id: 1,      
    }
  }

  componentWillMount() {
    var url = "https://jsonplaceholder.typicode.com/users";
    //var url = "https://randomuser.me/api?results=5";
    
    axios.get(url)
    .then(res=>{
      console.log(res.data);
      this.setState({
        users: res.data,
        id: res.data.length
      });
    });    
  }


  recibirDatos = (e) => {
    e.preventDefault();

    //console.log(this.nombreRef.current.value);
    //var posUltimo = this.state.users.length-1;

    var user = {
      id: this.state.id + 1 ,
      name: this.nombreRef.current.value,
      email: this.emailRef.current.value
    }

    if (this.state.edit === 'off') {      //insertar
      
      var arr = this.state.users;
      arr.push(user);

      this.setState({
        users: arr,
        id: this.state.id + 1
      });

    } else {        //editar

      let pos = this.state.idEdit;
      let todos = this.state.users;
      todos[pos].name= this.nombreRef.current.value;
      todos[pos].email = this.emailRef.current.value;

      this.setState({
        users: todos,
        edit: 'off'
      });       

    }
    
    this.limpiar();    
  }
  

  limpiar = () => {
    this.nombreRef.current.value = '';
    this.emailRef.current.value = '';
  }


  editar = (user) =>{
    this.nombreRef.current.value = user.name;
    this.emailRef.current.value = user.email;

    this.setState({
      edit: 'on',
      idEdit: this.state.users.findIndex( value => value.id === user.id)
    });
  }


  borrar = (user) => {
    //let ele = this.state.users.find(value => value.id === user.id);
    
    let todos = this.state.users;
    let pos = todos.indexOf(user);
    console.log(pos);
    todos.splice(pos, 1);
    console.log(todos);
    
    this.setState({
      users: todos,            
    });    
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card p-3 bloque">
              <h2>Formulario</h2>
              <form onSubmit={this.recibirDatos} >
                <div className="form-group">
                  <label>Nombre:</label>
                  <input className="form-control" type="text" ref={this.nombreRef} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input className="form-control" type="text" ref={this.emailRef} />
                </div>              
                <input type="submit" className="btn btn-primary" value="Añadir" />
              </form>
            </div>          
          </div>
          <div className="col-md-8 ">
            <div className="bloque">
              <h2>Tabla</h2>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>email</th>
                    <th>acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, i)=>{
                    return (                    
                      <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className="btn btn-primary" onClick={()=>this.editar(user)}>Editar</button>
                          <button className="btn btn-danger" onClick={()=>this.borrar(user)}>Borrar</button>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>       
          </div>
        </div>      
      </div>
    );
  }
}

export default App;

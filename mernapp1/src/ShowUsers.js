import React,{Component} from 'react';
import axios from 'axios';

//component display the view
class ShowUsers extends Component{
    constructor(){
        super();
        this.state={
            usersDetails:[]
        }
        axios.get('http://localhost:3001/getUsers')
        .then((response)=>{
            this.setState({  //using setstate u can modify the data of react
                usersDetails:response.data //capture response assign to local var
            })
        })
    }
    render(){
        //map used for iteration 
        let displayView=this.state.usersDetails.map((user,id)=>
        <tr>
        <td>{user.name}</td><td>{user.age}</td>
        </tr>
        )
        return(
            <div>
            <h1>Users Are Displayed From BackEnd</h1>
            <table className="tablestyle" border="2">
                <tr><th>User Name</th><th>User Age</th></tr>
                {displayView}
            </table>
            </div>
        )
    }
}

export default ShowUsers;
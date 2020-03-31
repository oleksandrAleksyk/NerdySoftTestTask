import React from 'react';
import ReactDOM from "react-dom";
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class WelcomeTitle extends React.Component
{
    render(){
        return(
            <div className="container-fluid">
            <h1 className="wlc">Welcome In Your Task Manager</h1>
            </div>
        );
    }      
}


class TaskAdder extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {titleValue: ' ',textValue: ' '};

        this.handleTitleChange= this.handleTitleChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);

        this.handleSumbit=this.handleSumbit.bind(this);

        
    }

    handleTitleChange (event){
        this.setState({titleValue: event.target.value});
    }
    handleTextChange (event){
        this.setState({textValue: event.target.value});
    }
    handleSumbit(event) {
        for (let i=0;i<10;i++)
        {
            if(localStorage.getItem(this.props.login+"titletask"+i) == null)
            {
                localStorage.setItem(this.props.login+"titletask"+i, this.state.titleValue);
                localStorage.setItem(this.props.login+"texttask"+i, this.state.textValue);
                ReactDOM.render(
                    <div>
                    <WelcomeTitle />
                    <TaskAdder login={this.props.login}/>
                    <hr />
                    <TaskTable login={this.props.login}/>
                    </div>,
                    document.getElementById('root') );
               
                break;
            } 
            else{
                continue;
            }
            break;

        }

              
    }

    render()
    {
        return(
            <div className="container taskAdd">
                <form onSubmit={this.handleSumbit}>
                    <div className="form-group">
                        <label htmlFor="taskTitle">Title</label>
                        <input type="text" id="taskTitle" className="form-control"
                        onChange={this.handleTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskText">Text</label>
                        <textarea id="taskText" type="text" className="form-control"
                        onChange={this.handleTextChange}></textarea>
                    </div>
                    <button type="sumbit" className="btn btn-primary"
                    onSubmit={this.handleSumbit}>Add New Task</button>
                </form>
            </div>
        );
    }
}


class TaskTable extends React.Component {
    constructor(props)
    {
        super(props);   
    this.state= {row: [ ]};
    }
    render()
    {
        return(
            <table className="table" id="taskTable" >  
            <thead className="thead-dark">              
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Control</th>
                    </tr>                                 
                 
            </thead>
                <TableRow login={this.props.login} />                
            </table>
        );
    }    
}

class TableRow extends React.Component {
    constructor(props)
    {
        super(props);           
        this.state= {count: 0};

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    } 
    handleNextClick(event)
    {
        this.setState({count: this.state.count+10});
        this.render();
    }
    handlePrevClick(event)
    {
        if(this.state.count>9){
        this.setState({count: this.state.count-10});
        this.render();}
        
    }
    render()
    {  
        if(localStorage.getItem(this.props.login+"titletask"+"11") == null)
        {
            return(
            <tbody>
            <TableRowAdder login={this.props.login} counter={0+this.state.count} />
            <TableRowAdder login={this.props.login} counter={1+this.state.count} />
            <TableRowAdder login={this.props.login} counter={2+this.state.count} />
            <TableRowAdder login={this.props.login} counter={3+this.state.count} />
            <TableRowAdder login={this.props.login} counter={4+this.state.count} />
            <TableRowAdder login={this.props.login} counter={5+this.state.count} />
            <TableRowAdder login={this.props.login} counter={6+this.state.count} />
            <TableRowAdder login={this.props.login} counter={7+this.state.count} />
            <TableRowAdder login={this.props.login} counter={8+this.state.count} />
            <TableRowAdder login={this.props.login} counter={9+this.state.count} />     

            <button className="btn btn-primary" onClick={this.handleNextClick}>Next</button> 
            <button className="btn btn-primary" onClick={this.handlePrevClick}>Prev</button>

            </tbody>);
        }

        
    }
}


class TableRowAdder extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
        this.handleShareClick=this.handleShareClick.bind(this);
    }

    handleEditClick(event)
    {
        var newTitle=prompt("Enter new title", "");
        var newText=prompt("Enter new text", "");
        localStorage.setItem(this.props.login+"titletask"+this.props.counter, newTitle);       
        localStorage.setItem(this.props.login+"texttask"+this.props.counter, newText);
        
        ReactDOM.render(
        <div>
            <WelcomeTitle />
            <TaskAdder login={this.props.login}/>
            <hr />
            <TaskTable login={this.props.login}/>
            <SharedTaskTable login={this.props.login} />   
        </div>,
            document.getElementById('root')
            );        
    }
    handleDeleteClick(event)
    {
      let conf=window.confirm("are you sure?");
      if(conf==true)
      {
          localStorage.removeItem(this.props.login+"titletask"+this.props.counter);
          localStorage.removeItem(this.props.login+"texttask"+this.props.counter);
          ReactDOM.render(
            <div>
            <WelcomeTitle />
            <TaskAdder login={this.props.login}/>
            <hr />
            <TaskTable login={this.props.login}/>
            <SharedTaskTable login={this.props.login} />   
        </div>,
            document.getElementById('root')
          );
      }
    }
    handleShareClick(event)
    {
        let user=prompt("Enter user name");
        for (let i=0;i<15;i++)
        {
            if(localStorage.getItem(user+"titletask"+i+"shared") == null)
            {
                localStorage.setItem(user+"sharedWith"+i,this.props.login );
                localStorage.setItem(user+"sharedCounter"+i,this.props.counter);
                ReactDOM.render(
                    <div>
                    <WelcomeTitle />
                    <TaskAdder login={this.props.login}/>
                    <hr />
                    <TaskTable login={this.props.login}/>   
                    <SharedTaskTable login={this.props.login} />                 
                    </div>,
                    document.getElementById('root') );
               
                break;
            } 
            else{
                continue;
            }
            break;
        }
    }


    render(){  
        if(localStorage.getItem(this.props.login+"titletask"+this.props.counter)!==null)
        {
        return(         
            <tr>
                <th scope="col">{localStorage.getItem(this.props.login+"titletask"+this.props.counter)}</th>
                <th scope="col">{localStorage.getItem(this.props.login+"texttask"+this.props.counter)}</th>
                <th scope="col">
                    <button class="btn btn-info" onClick={this.handleEditClick}>Edit</button>
                    <button class="btn btn-info" onClick={this.handleDeleteClick}>Delete</button>
                    <button class="btn btn-info" onClick={this.handleShareClick}>Share</button>
                </th>
        </tr> 
         ); }
        else 
        {
            return null;
        }
        
    }         
}


class SharedTaskTable extends React.Component {
    constructor(props)
    {super(props);}
    render(){
        for(let i=0;i<15;i++)
        {
            if(localStorage.getItem(this.props.login+"sharedWith"+i)!==null)
            {
                return( 
                    <div>
                    <label htmlFor="sharedTable">Shared Task</label>
                        <table className="table" id="sharedTable">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Text</th>
                                    <th>From</th>
                                    <th>Control</th>
                                </tr>
                            </thead>
                            <SharedTaskRow thisUser={this.props.login} counter={i}/>
                        </table>
                    </div> );
            }
            else {
                return null;
            }
        }
    } 
}

class SharedTaskRow extends React.Component {
    constructor(props)
    {super(props);}

    render()
    {
        for(let i=0;i<15;i++)
        {
        let sharedUser=localStorage.getItem(this.props.thisUser+"sharedWith"+i);
        let sharedCounter=localStorage.getItem(this.props.thisUser+"sharedCounter"+i);
        return(
            <SharedTaskRowAdder thisUser={this.props.thisUser} 
            sharedUser={sharedUser} sharedCounter={sharedCounter} 
            counter={this.props.counter}
            />
        )
        }
        
    }
}
class SharedTaskRowAdder extends React.Component 
{
    constructor(props)
    {super(props);
    this.handleEditClick=this.handleEditClick.bind(this);
    this.handleDeleteClick=this.handleDeleteClick.bind(this);
    this.handleShareClick=this.handleShareClick.bind(this);
    }

    handleEditClick(event)
    {
        var newTitle=prompt("Enter new title", "");
        var newText=prompt("Enter new text", "");
        localStorage.setItem(this.props.sharedUser+"titletask"+this.props.sharedCounter, newTitle);       
        localStorage.setItem(this.props.sharedUser+"texttask"+this.props.sharedCounter, newText);        
        ReactDOM.render(
        <div>
            <WelcomeTitle />
            <TaskAdder login={this.props.thisUser}/>
            <hr />
            <TaskTable login={this.props.thisUser}/>
            <SharedTaskTable login={this.props.thisUser} />
        </div>,
            document.getElementById('root')
            );        
    }
    handleDeleteClick(event)
    {
      let conf=window.confirm("are you sure?");
      if(conf==true)
      {
          localStorage.removeItem(this.props.sharedUser+"titletask"+this.props.sharedCounter);
          localStorage.removeItem(this.props.sharedUser+"texttask"+this.props.sharedCounter);
          localStorage.removeItem(this.props.thisUser+"sharedWith"+this.props.counter);
          ReactDOM.render(
            <div>
            <WelcomeTitle />
            <TaskAdder login={this.props.thisUser}/>
            <hr />
            <TaskTable login={this.props.thisUser}/>
            <SharedTaskTable login={this.props.thisUser} />
        </div>,
            document.getElementById('root')
          );
      }
    }

    handleShareClick(event)
    {
        let user=prompt("Enter user name");
        for (let i=0;i<15;i++)
        {
            if(localStorage.getItem(user+"titletask"+i+"shared") == null)
            {
                localStorage.setItem(user+"sharedWith"+i,this.props.login );
                localStorage.setItem(user+"sharedCounter"+i,this.props.counter);
                ReactDOM.render(
                    <div>
                    <WelcomeTitle />
                    <TaskAdder login={this.props.thisUser}/>
                    <hr />
                    <TaskTable login={this.props.thisUser}/>           
                    <SharedTaskTable login={this.props.thisUser} />         
                    </div>,
                    document.getElementById('root') );
               
                break;
            } 
            else{
                continue;
            }
            break;
        }
    }
    render(){
        return(
            <tbody>
                <tr>
                    <th scope="col">
                    {localStorage.getItem(this.props.sharedUser+"titletask"+this.props.sharedCounter)}
                    </th>
                    <th scope="col">
                    {localStorage.getItem(this.props.sharedUser+"texttask"+this.props.sharedCounter)}
                    </th>
                    <th scope="col">
                        {this.props.sharedUser}
                    </th>
                    <th scope="col">
                    <button class="btn btn-info" onClick={this.handleEditClick}>Edit</button>
                    <button class="btn btn-info" onClick={this.handleDeleteClick}>Delete</button>
                    <button class="btn btn-info" onClick={this.handleShareClick}>Share</button>
                    </th>
                </tr>
            </tbody>
        );

    }
}





class MainPage extends React.Component {
    constructor (props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
                <WelcomeTitle />
                <TaskAdder login={this.props.login}/>
                <hr />
                <TaskTable login={this.props.login}/>   
                <SharedTaskTable login={this.props.login} />            
            </div>
        );
        
    }
}


export default MainPage
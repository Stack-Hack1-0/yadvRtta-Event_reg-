import React ,{ Component }from 'react';
import './RegForm.css';
import axios from 'axios';
//import Animate from 'animate.css';

class RegForm extends Component {
    constructor(){
        super();
        this.state={
            name:"",
            mob:"",
            em:"",
            reg:"",
            tik: 1,
            fle: null
        }
    }
    onChange =e =>{
        this.setState({[e.target.id]: e.target.value});
    }
    fileChangeHandler = e =>{
        console.log(e);
        
         const imageFile = e.target.files[0];
        if (!imageFile.name.match(/\.(jpeg|png)$/)) {
            alert('cHOOSE A VALID FILE!!!');
        }
        else{
            this.setState({
                fle : e.target.files[0]
            })
        }
    }
    onSubmit=e => {
        e.preventDefault();

        const eventForm={
            name : this.state.name,
            mob : this.state.mob,
            em : this.state.em,
            reg : this.state.reg,
            tik : this.state.tik,
            fle : this.state.fle
        }
        axios.post('http://localhost:5000/eventreg',{eventForm})
        .then(res => {
            console.log(res);
        }

        )
    }
   
    render(){
        let noOftik=null;
        if(this.state.reg==="self")
        {
            noOftik= <input type="number"value={this.state.tik} id="tik" />
        }
        else
        {
            noOftik= <input type="number"value={this.state.tik} id="tik" onChange={this.onChange}/>
        }
        return(

            <div className="Reg">
                
                    
                
                <form>
                   <label>
                       FULL NAME:
                   </label> 
                   <input type="text" id="name" value={this.state.name} onChange={this.onChange}/>
                   <label>
                       MOBILE:
                    </label>
                    <input type="text" id="mob" value={this.state.mob} onChange={this.onChange}/>
                   <label>
                       E-mail:
                   </label>
                   <input type="text" id="em" value={this.state.em} onChange={this.onChange}/>
                   <label>
                       UPLOAD YOUR ID:
                   </label>
                   <input style={{display: 'none'}}
                   type="file" 
                   onChange={this.fileChangeHandler}
                   ref={fileInp => this.fileInp = fileInp}/>
                    <button onClick = { ()=> this.fileInp.click()}>PICK FILE</button>
                   <label>
                       REGISTRATION-TYPE:
                   </label>
                   <select value={this.state.reg} id="reg" onChange={this.onChange}>
                       
                       <option value="self">SELF</option>
                       <option value="grp">GROUP</option>
                       <option value="crp">CORPORATE</option>
                       <option value="others">OTHERS</option>
                   </select>
                   <label>
                       NO OF TICKETS:
                   </label>
                   {noOftik}
                   <button onClick={this.onSbmit}>SUBMIT</button>

                </form>
            </div>
        );
    }
}

export default RegForm;
import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker";
import Autocomplete from  'react-autocomplete';
import "react-datepicker/dist/react-datepicker.css";


class Listdeatails extends React.Component {
    constructor()  {
        super()
        this.state = {
          deatails: [],
          formArray:[],
          startDate: new Date(),
          Color:[],
          Races:[],
          value:'',
          RaceId:Number
        }
        this.state.value= this.state.formArray.ColorID;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.routeToHome = this.routeToHome.bind(this);
      }
  
     
      componentDidMount(){
        console.log('get idddd ' + this.props.match.params.id)

        axios.post(`http://a.payclick.co.il/api/sample/GetAnimalDetails`, {
            Token: 'token_pradeep',
            ID: this.props.match.params.id
        })
          .then(res => {
            console.log( res.data.AnimalDetails);
            var temp = res.data.AnimalDetails;
            console.log(temp['ColorID']);
            temp['ColorID']= temp['ColorID'].toString();
            temp['RaceID']= temp['RaceID'].toString();

            console.log(temp);
            this.setState({ valueColor: temp['ColorID'] });
            this.setState({ valueRace: temp['RaceID'] });
            this.setState({formArray:temp})
           // this.setState({deatails:[temp]} )
          })

          axios.post(`http://a.payclick.co.il/api/sample/GetColors`, {
            Token: 'token_pradeep',
        })
          .then(res => {
            var temp = res.data.Colors
            this.setState({Color:temp})
            var val = this.state.valueColor
            var index = temp.findIndex(function(item, i){
              return item.ID == val
            });
            this.setState({valueColor:temp[index]['Name']})
          })


          axios.post(`http://a.payclick.co.il/api/sample/GetRaces`, {
            Token: 'token_pradeep',
        })
          .then(res => {
            var temp = res.data.Races
            this.setState({Races:temp})

            var val = this.state.valueRace
            var index = temp.findIndex(function(item, i){
              return item.ID == val
            });
            this.setState({valueRace:temp[index]['Name']})
          })

     
      }

      handleClick(e) {
        console.log(e)
        //this.props.history.push(`deatails/e`)
      }

      handleChange(evt) {
        console.log(evt)
      
        const { formArray } = { ...this.state };
        const currentState = formArray;
        const { name, value } = evt.target;
        currentState[name] = value;
      
        this.setState({ formArray: currentState });
      }

      handleSubmit(event) {
        event.preventDefault();
     //   alert('A name was submitted: ' + this.state.formArray);

        console.log('Name ' + this.state.formArray.Name)
        console.log('Birthdate ' + this.state.formArray.Birthdate )
        console.log('IsDangerous ' + this.state.formArray.IsDangerous)
        console.log('colorid ' + this.state.value)
        console.log('raceid ' + this.state.Races)

        var temobj = {
          Token: 'token_pradeep',
          ID:this.state.formArray.ID,
          Name:this.state.formArray.Name,
          RaceID:this.state.RaceId,
          ColorID:20,
          Birthdate:this.state.formArray.Birthdate,
          IsDangerous:this.state.formArray.IsDangerous
        }

        axios.post(`http://a.payclick.co.il/api/sample/SaveAnimalDetails`,temobj)
        .then(res => {
          console.log('res ' + JSON.stringify(res))
          if(res.data.IsSuccess){
            this.props.history.push(`/`)
          }else{
            alert('Something went wrong')
          }

        })

      }
      
routeToHome(){
  this.props.history.push(`/`)  
}
getColor() {
  return this.state.Color
}

matchColor(state, value) {
  return (
   state.Name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1 ||
   state.ID.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1
  );
}

getRace() {
  return this.state.Races
}

matchRace(state, value) {
  return (
   state.Name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1 ||
   state.ID.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1
  );
}


    render() {
      let formData = this.state.formArray;
  
      return <div className="container">

              <h1 className="mt-3" >Animals details</h1>
            
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name: </label>
                <input type="text" className="form-control" value={formData.Name} onChange={this.handleChange} name="Name" placeholder="Enter Name" />
              </div>
              
              <div className="form-group autocomplete">
                <label>Color: </label>
              
                <Autocomplete 
              value={ this.state.valueColor}
              inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'block', }}
              items={ this.getColor() }
              getItemValue={ item => item.Name }
              shouldItemRender={ this.matchColor }
              onChange={(event, value) => this.setState({valueColor:value}) }   
              onSelect={(value, item) => {            
                this.setState({ valueColor:value,ColorId:item['ID'] })
                
              } }
              renderMenu={ children => (
                <div className = "menu">
                  { children }
                </div>
              )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.ID } >
                  { item.Name }
                </div>
              )}
            />
              </div>

              <div className="form-group autocomplete">
                <label>Race: </label>
                {/* <input type="text" className="form-control" value={formData.RaceID} onChange={this.handleChange} name="RaceID" placeholder="Enter RaceID" />
              */}
                <Autocomplete 
                
                value={ this.state.valueRace}
                inputProps={{ id: 'states-autocomplete' }}
                wrapperStyle={{ position: 'relative', display: 'block', }}
                items={ this.getRace() }
                getItemValue={ item => item.Name }
                shouldItemRender={ this.matchRace }
                onChange={(event, value) => this.setState({valueRace:value}) }
                onSelect={(value, item) => {            
                  this.setState({ valueRace:value,RaceId:item['ID'] })
                  
                } }
                renderMenu={ children => (
                  <div className = "menu">
                    { children }
                  </div>
                )}
                renderItem={ (item, isHighlighted) => (
                  <div
                    className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                    key={ item.ID } >
                    { item.Name }
                  </div>
                )}
              />        
                  
              </div>

              <div className="form-group">
                <label>BirthDay: </label>
                <input type="text" className="form-control" value={formData.Birthdate} onChange={this.handleChange} name="Birthdate" placeholder="Enter Birthdate" />
              </div>
              <div>
              {/* <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            /> */}
              </div>
              <div className="form-group">
                <div>
                    IsDangerous:
                  </div>
                  <label className="radio-inline mr-3 " >
                  <input type="radio" name="IsDangerous" className="mr-2" value='true' checked onChange={this.handleChange}  />Yes
                </label>
                <label className="radio-inline mr-3 ">
                  <input type="radio" name="IsDangerous" className="mr-2" value='false' onChange={this.handleChange}  />No
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-primary ml-3" onClick={this.routeToHome} >Cancle</button>
            </form>


          
          </div>



    }

}
export default Listdeatails


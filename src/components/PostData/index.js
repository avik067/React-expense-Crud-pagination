import { Component } from "react";
import './index.css'

class PostData extends Component {
   
   
     
    constructor (props) {
        super(props)

        this.state = {nm:'',cat:'',dt:new Date().toISOString().slice(0,10),amt:'',sendDt:new Date().toISOString(),createdBy:'',notice:'',showNotice:false}
        
    }



    cancleEdit = () => {
        const {refreshPost} = this.props
        refreshPost()
    }


    submitData = async (event) => {
      event.preventDefault()
      const {refreshPost} = this.props
       const {nm,cat,sendDt,amt,createdBy} = this.state
      
      const jsonOb= {
        name:nm ,
        category:cat,
        amount:amt ,
        date_of_expense:sendDt,
        created_by:createdBy
      }

      const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonOb),
      }
     try{
      const response = await fetch(`https://crud-api-mongo-pagination.vercel.app/expense`,options)
      const data = await response.json()
      console.log(data)
      console.log(response.status)
      if (response.status === 200) {
        console.log("success full post to Db ")
        this.setState({notice:'',showNotice:false})
        refreshPost()
      }
      else{
        console.log("Failed ", data.message)
        this.setState({notice:data.message,showNotice:true})

      }

     }
     catch(e) {
        console.log(e.message)
     }
     

    }

    changeName= (event) =>{

        const nameVal = event.target.value
        // console.log(nameVal)
        this.setState({nm:nameVal})
    }

    changeCategory = (event) => {
        const catVal = event.target.value
        // console.log(catVal)
        this.setState({cat:catVal})
    }
    changeDate =(event) => {
        const date = event.target.value
        
        console.log(date)
        const  dateIso = new Date(date)
        const dateVal=dateIso.toISOString()
        const showDate= dateIso.toISOString().slice(0,10)
        console.log(dateVal)
        this.setState({dt:showDate,sendDt:dateVal})
    } 

    changeAmount = (event) =>{
        const amtVal = event.target.value
        // console.log(amtVal)
        this.setState({amt:amtVal})
    }

    changeUser = (event) =>{
        const createdBy= event.target.value
        // console.log(createdBy)
        this.setState({createdBy})
    }

    render() {
         const {nm,cat,dt,amt,createdBy,notice,showNotice} =this.state
        return (
            <form  className="form" onSubmit={this.submitData}>
                <h1>Create New Expense</h1>
             <p>Name</p>
             <input type="text" onChange={this.changeName} value={nm}/>
             <p>Category</p>
             <input type="text" onChange={this.changeCategory} value={cat}/>
             <p>Date of Expense</p>
             <input type="date"  onKeyDown={(e) => e.preventDefault()} onChange={this.changeDate} value={dt}/>
             <p>Expense Amount</p>
             <input type="text" className="num-input" placeholder="Only Number as per Schema model" onChange={this.changeAmount} value={amt}/>
             <br />
             <p>Created By</p>
             <input type="text" onChange={this.changeUser} value={createdBy}/>
             <br />
             <br/>
             <button type="button" className="cancel" onClick={this.cancleEdit}>Cancle</button>
             <button type="submit" className="green-but">Create Expense</button>
             {showNotice && <p className="red">{notice}</p>}
    </form>
        );
    }
}

// onFocus={(e) => e.target.type = 'date'} onBlur={(e)=> e.target.type='text'}
export default PostData
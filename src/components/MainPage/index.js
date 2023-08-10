import { Component } from "react";
import { ColorRing } from 'react-loader-spinner'
import ListItem from  "../ListItem"
import Edit from "../Edit"
import PostData from "../PostData"
import './index.css'


class MainPage extends Component {

    state = {arrayList:[],limit:6 ,putOb:{} ,postOb:{},keyWord:'', page:1,isLoading:true,showEdit:false,showPost:false}

    componentDidMount () {
        this.getData()
    }  
    
    getData = async () => {
      const {keyWord,page,limit} = this.state
      const  url= (keyWord === '') ? `https://crud-api-mongo-pagination.vercel.app/expenses?limit=${limit}&page=${page}` : `https://crud-api-mongo-pagination.vercel.app/expense/${keyWord}`
      try {
        const rowData = await fetch(url)
        const jsonData = await rowData.json()
        console.log(jsonData)
        this.setState({arrayList:jsonData,isLoading:false})
      }
      catch (e) {
        console.log(e)
      }
    }
   
    delFromDb  = (id) => {
       this.delData(id)
       this.setState({isLoading:true})
    }

    delData = async (id) => {
      const option = {
            method:"DELETE"  
      }
     try {
      const rowData = await fetch(`https://crud-api-mongo-pagination.vercel.app/expense/${id}/`,option)   
      const jsonData = await rowData.json()
      console.log("deleted",jsonData)
      this.getData()
     }catch(e) {
      console.log(e)
     }     
  }
    
    putInDb = (id) =>{
      const  {arrayList} = this.state

      const editOb= arrayList.find(each => each._id === id )
      
      this.setState(pre => ({...pre,showEdit:true,putOb:editOb}))
    }
    
    refreshPage = () =>{
      console.log("Hi refresh")
      this.setState({isLoading:true,showEdit:false,showPost:false})
      this.getData()
    }
    showAdd = () =>{
      this.setState({showPost:true})
    }

    nextPage = async () => {
      const  {arrayList} = this.state
      if (true && arrayList.length > 0) { 
        await this.setState( pre => ({...pre, page:(pre.page + 1 ),isLoading:true})) 
        this.getData()
      }
    
      console.log("next")
   
  }
  
  prePage = async () => {
        const {page} = this.state
        if  (page > 1) { 
          await this.setState( pre => ({...pre, page:(pre.page - 1 ),isLoading:true}))
          this.getData()
       }
        
        console.log("pre")
    }

    changeKeyword = (event) =>{
      const key = event.target.value
      this.setState({keyWord:key})
    }
    render () {
          const {arrayList,isLoading,showEdit,putOb,showPost} = this.state
              
        return (
          <>
            <div className="main">
                <div className="row-nor apart wrap">
                  <h1>MY EXPENSE MANEGER </h1> 
                  <input type="search" placeholder="Search By Name" onChange={this.changeKeyword} />
                  <button type="button" className="search" onClick={this.getData}>Search</button>
                  <button type="button" className="add" onClick={this.showAdd}>+ New Expense</button>
                </div>
              
                <ul className="table"> 
                    <li className="header-list row-nor"> 
                       <p className="p">Name </p>
                       <p className="p">Category</p>
                       <p className="p">Date of Expense</p>
                       <p className="p">Amount</p>
                       <p className="p">Updated At</p>
                       <p className="p">Created by</p>
                       <p className="button-gap">{}</p>
                    </li>
                    
                    {isLoading && <div className="row-nor center"><ColorRing
                    
                                height="40"
                                width="40"
                                radius="9"
                                color="red"
                                ariaLabel="loading"
                                
                    /></div>}
                    {arrayList.map(each=> <ListItem details={each} key={each._id} triggerDel={this.delFromDb} triggerPut={this.putInDb}/>)}

                </ul>
                <button type="button" className="next" onClick={this.prePage}>Pre</button>
                <button type="button" className="pre" onClick={this.nextPage}>Next </button>
            </div>
            {showEdit && <Edit putDetails={putOb} refreshPut={this.refreshPage} key={putOb._id} />}
            {showPost && <PostData  refreshPost={this.refreshPage} key="eferf456" />}
            </>
        )
    }
}

export default MainPage

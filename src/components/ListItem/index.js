
import './index.css'

const ListItem = ({details,triggerDel,triggerPut}) => {
   
    const {_id,updatedAt,name,date_of_expense,created_by,category,amount} = details
 
    const  editList = () =>{
        triggerPut(_id)
    }
    
    const delList =() =>{
        triggerDel(_id)
    }
    

    return <li className='data-list row-nor'>
    <p className="p">{name}</p>
    <p className="p">{category}</p>
    <p className="p">{new Date(date_of_expense).toISOString().slice(0,10)}</p>
    <p className="p">{amount}</p>
    <p className="p">{new Date(updatedAt).toISOString().slice(0,10)}</p>
    <p className="p">{created_by}</p>
    <div className='side-but-container'>
    <button className="edit" type="button" onClick={editList}>Edit</button>
    <button className="del" type="button" onClick ={delList}>Del</button>
    </div> 
    </li>
}


export default ListItem
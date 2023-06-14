// https://www.youtube.com/watch?v=wLZTaRySN4Y&t=72s --You Tube Link of this project
// https://www.youtube.com/watch?v=eGA5TCdjcSE&t=481s --To edit 
import { useEffect, useState } from 'react'
import './ToDoList_Updated_Style.css'

function reloadData(){
    let data=localStorage.getItem('storeageName');
    if(data){
        return JSON.parse(localStorage.getItem('storeageName'))
    }
    else{
        return [];
    }
}

export function ToDoList_Updated_Index() {
    const[inputData,setInputData]=useState("");
    const[arrData,setArrData]=useState(reloadData());
    const[toogleAddButton,setToogleAddButton]=useState(true);
    const[editItem,setEditItem]=useState(null);

    function handleChange(e){
        setInputData(e.target.value);
    }
    function handleAddClick(){
    if(inputData==""){
        alert("Please write something...")
    }
    else if(inputData && !toogleAddButton){
        setArrData(
            arrData.map((elem)=>{
                if(elem.id===editItem){
                    return {...elem,name:inputData}
                }
                return elem;
            })
        )
        setToogleAddButton(true);
        setInputData("");
        setEditItem(null);
    }
    else{
        let allInputData={
            id:new Date().getTime().toString(),
            name:inputData
        }
        setArrData(function(arrData){
            return [...arrData,allInputData];
        })
        setInputData("");
    }
    }
    function handleDelete(index){
        alert("Are you sure....")
        setArrData(arrData.filter((elem)=>{ //Here array.filter() is same like array.map().
            return index !== elem.id
        }))
        // setArrData(updatedData);        
    }
    function handleAllDelet(){
        alert("Are you sure to delete all...")
        setArrData([]);
    }
    useEffect(()=>{
        localStorage.setItem("storeageName",JSON.stringify(arrData));//Here first parameter is Local Storage Name and second one is data to be stored.
    },[arrData])

    /*
    Steps to edit item:-
    1.Get id and name of data which user clicked to edit.
    2.Set the toogle mode to change the add button to edit button.
    3.Now update the value of setInputData with the new updated value to edit.
    4.Lastly to pass the edited inputData to same arrData clicked to be edited.   
    */
    function handleEdit(id){
        let newEditItem=arrData.find((elem)=>{
            return elem.id==id;
        })
        console.log(newEditItem);
        // setArrData(newEditItem);
        setToogleAddButton(false);
        setInputData(newEditItem.name);
        setEditItem(id);
    }

    return (
        <div className="container-fluid">
            <div className="body_ToDo">
                <div className="app_ToDo">
                    <center>
                    <figure>
                        <img src="images/todo1.jpg" width="50px" height="70px" alt="" />
                        <figcaption>To Do List <span className='bi bi-pen-fill'></span> </figcaption>
                    </figure> 
                    </center>
                    <div style={{display:'flex'}}>
                        <input onChange={handleChange} value={inputData} type="text" placeholder='Add To Do List' className='form-control w-75 mt-1' />
                        
                            {
                                toogleAddButton? <button onClick={handleAddClick} className='btn btn-primary w-25'> <span className='bi bi-plus-lg'></span> </button> :
                                <button onClick={handleAddClick} className='btn btn-warning w-25'> <span className='bi bi-pen'></span> </button>
                            }
                        
                    </div>
                    <div className=' mt-3'>
                        <ol>
                            {
                                arrData.map((x)=>
                                    <li key={x.id}> {x.name} 
                                        <button onClick={()=>handleDelete(x.id)} className='btn btn-danger p-0 ms-2'> <span className='bi bi-trash'></span> </button>
                                        <button onClick={()=>handleEdit(x.id)} className='btn btn-warning p-0 ms-2'> <span className='bi bi-pen'></span> </button>
                                    </li>
                                )
                            }
                        </ol>
                    </div>
                    <div>
                        
                    </div>
                        <center>
                          <button onClick={handleAllDelet} className='btn btn-danger'>Delete All</button>
                        </center>
                </div>
            </div>
        </div>
    )
}
import React, {useState} from "react"


function Bounties(props){
    const [editFirstName, setEditFirstName] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editLiving, setEditLiving] = useState("")
    const [editBountyAmount, setEditBountyAmount] = useState("")
    const [editType, setEditType] = useState("")
    const [isInEditMode, setIsInEditMode] = useState(false)

    return(
        <div className="bounty-container">
            <div className="bounty-list">   
                <h3 className="info">First Name: {props.firstName}</h3>
                <h3 className="info">Last Name: {props.lastName}</h3>
                <h3 className="info">Living: {props.living}</h3>
                <h3 className="info">Bounty Amount: ${props.bountyAmount}</h3>
                <h3 className="info">Type: {props.type}</h3>
                <button onClick={()=> setIsInEditMode(prevEditmode => !prevEditmode)}>{isInEditMode === false? "Edit ": "Cancel"}</button>
                <button onClick={()=>props.handleDeletion(props.id)}>Delete</button>
                
            </div>
            
            {isInEditMode === true?
                <form onSubmit={
                    (e)=>{
                        props.handleUpdate(e,
                            {
                                firstName: editFirstName, lastName: editLastName, living: editLiving, bountyAmount: editBountyAmount, type: editType
                            }, props.id)
                        setIsInEditMode(prevEditmode => !prevEditmode)
                    }
                }>
                    <input type="text" name="firstName" value={editFirstName} placeholder="First Name" onChange={(e)=>setEditFirstName(e.target.value)}/>
                    <input type="text" name="lastName" value={editLastName} placeholder="Last Name" onChange={(e)=>setEditLastName(e.target.value)}/>
                    <input type="text" name="living" value={editLiving} placeholder="Living" onChange={(e)=>setEditLiving(e.target.value)}/>
                    <input type="text" name="bountyAmount" value={editBountyAmount} placeholder="Bounty Amount" onChange={(e)=>setEditBountyAmount(e.target.value)}/>
                    <input type="text" name="type" value={editType} placeholder="Type" onChange={(e)=>setEditType(e.target.value)}/>
                    
                    <button>Save</button> 
                </form>
            :null}
            <hr/>
        </div>
    )
}

export default Bounties
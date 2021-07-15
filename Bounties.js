import React, {useState} from "react"

const initialValues = {
    editFirstName: "",
    editLastName: "",
    editLiving: "",
    editBountyAmount: "",
    editType: "",
  }

function Bounties(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValues, setEditValues] = useState(initialValues)

    const handleOnChangeEdit = (e) => {
        const {name, value} = e.target

        setEditValues({
            ...editValues,
            [name]: value
        })
    }

    return (
        <div className="bounties-container">
            <div className="info">
                <p>{props.values.firstName}</p>
                <p>{props.values.lastName}</p>
                <p>Living: {props.values.living}</p>
                <p>${props.values.bountyAmount}</p>
                <p>{props.values.type}</p>
            </div>
            <button onClick={()=> setIsEditing(prevIsEditing => !prevIsEditing)}>{isEditing === false? "Edit ": "Cancel"}</button>
            <button onClick={()=>props.handleDelete(props.values._id)}>Delete</button>

            {isEditing?
                <form className="edit-form" onSubmit={
                    (e)=> {
                        props.handlePut( e,
                        {firstName: editValues.firstName, lastName: editValues.lastName, living: editValues.living, bountyAmount: editValues.bountyAmount, type: editValues.type}
                        , props.values._id
                        )
                      setIsEditing(prevEditmode => !prevEditmode)
                    }
                }>
                    <input name="firstName" value={editValues.firstName} placeholder="First Name" onChange={handleOnChangeEdit} />
                    <input name="lastName" value={editValues.lastName} placeholder="Last Name" onChange={handleOnChangeEdit} />
                    <input name="living" value={editValues.living} placeholder="Living" onChange={handleOnChangeEdit} />
                    <input name="bountyAmount" value={editValues.bountyAmount} placeholder="Bounty Amount" onChange={handleOnChangeEdit} />
                    <input name="type" value={editValues.type} placeholder="Type" onChange={handleOnChangeEdit} />
                    <button>Save</button>
                </form>
            :null }
            <hr/>
        </div>
    )
}

export default Bounties
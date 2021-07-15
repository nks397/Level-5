import axios from "axios"
import React, {useEffect, useState} from "react"
import Bounties from "./Bounties"

const initialValues = {
    firstName: "",
    lastName: "",
    living: "",
    bountyAmount: "",
    type: "",
  }

function App() {
    const [values, setValues] = useState(initialValues)
    const [bountyData, setBountyData] = useState([])
    
    useEffect(() => {
        axios.get("/bounties")
        .then(res => setBountyData(res.data))
        .catch(err => console.log(err))
    },[])
    console.log(bountyData, "bountydata")

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const handlePut = (e, edits, bountyId) => {
        e.preventDefault()
        axios.put(`/bounties/${bountyId}`, edits)
        .then(res => setBountyData(prevBountyData => prevBountyData.map(bounty => bounty._id !== bountyId ? bounty : res.data)))
        .catch(err => console.log(err))
        console.log(bountyId, "id")
        console.log(edits, "edits")
    }
   
    const handleDelete = (bountyId) => {
        axios.delete(`/bounties/${bountyId}`)
        .then(() => {setBountyData(prevBountyData => prevBountyData.filter(bounty => bounty._id !== bountyId))})
        .catch(err => console.log(err))
        console.log(bountyId, "BountyId")
    }

    const resetInputs = () =>{
        setValues("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/bounties", values)
            .then(res => setBountyData(prevBountyData => [...prevBountyData, res.data]))
            .catch(err => console.log(err))
    }

    return(
        <div>
            <form className="initial-form" onSubmit={handleSubmit}>
                <div className="title">Bounter Hunter Part 3</div>
                <input name="firstName" value={values.firstName} placeholder="First Name" onChange={handleOnChange} />
                <input name="lastName" value={values.lastName} placeholder="Last Name" onChange={handleOnChange} />
                <input name="living" value={values.living} placeholder="Living" onChange={handleOnChange} />
                <input name="bountyAmount" value={values.bountyAmount} placeholder="Bounty Amount" onChange={handleOnChange} />
                <input name="type" value={values.type} placeholder="Type" onChange={handleOnChange} />
                <input type="reset" onClick={resetInputs} />
                <button>Submit</button>
            </form>
            {bountyData.map(bounty => <Bounties key={bounty._id} values={bounty} handleDelete={handleDelete} handlePut={handlePut}/>)}
        </div>
    )
}

export default App
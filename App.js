import React, {useEffect, useState} from "react"
import axios from "axios"
import BountyList from "./BountyList"

function App(){ 
    const [bountyData, setBountyData] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [living, setLiving] = useState("")
    const [bountyAmount, setBountyAmount] = useState("")
    const [type, setType] = useState("")
    
    useEffect(() => {
        axios.get("/bounties")
        .then(res => setBountyData(res.data))
        .catch(err => console.log(err))
    
        console.log(bountyData, "data")

    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPost = {
            firstName,
            lastName,
            living,
            bountyAmount,
            type
        }
        
        console.log(newPost, "newPost");
        axios.post("/bounties", newPost)
        .then(res => setBountyData(prevBountyData => [...prevBountyData, res.data]))
        
        .catch(err => console.log(err))
    }

    const resetInputs = () =>{
        setFirstName("")
        setLastName("")
        setLiving("")
        setBountyAmount("")
        setType("")
    }

    const handleUpdate = (e, edits, bountyId) => {
        e.preventDefault()
        axios.put(`/bounties/${bountyId}`, edits)
        .then(res => {
            setBountyData(prevBountyData => prevBountyData.map(bounty => bounty._id !== bountyId ? bounty : res.data))
            
        })
        .catch(err => console.log(err))
    }

    const handleDeletion = (bountyId) => {
        axios.delete(`/bounties/${bountyId}`)
        .then(() => {
            setBountyData(prevBountyData => prevBountyData.filter(bounty => bounty._id !== bountyId))
        })
        
        .catch(err => console.log(err))
        console.log(bountyId, "bountyId") 
    }

    return(
        <div className="main-container">
            <h1 class="title">Bounty Hunter Part 2: Wanted for Murder</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={firstName} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" name="lastName" value={lastName} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                <input type="text" name="living" value={living} placeholder="Living" onChange={(e)=>setLiving(e.target.value)}/>
                <input type="text" name="bountyAmount" value={bountyAmount} placeholder="Bounty Amount" onChange={(e)=>setBountyAmount(e.target.value)}/>
                <input type="text" name="type" value={type} placeholder="Type" onChange={(e)=>setType(e.target.value)}/>
                <input type="reset" onClick={resetInputs}/>
                <button >Submit</button>
            </form>
            {bountyData.map(item => {return <BountyList key={item._id} id={item._id} firstName={item.firstName} setFirstName={item.setFirstName} lastName={item.lastName} setLastName={item.setLastName} living={item.living} setLiving={item.setLiving} bountyAmount={item.bountyAmount} setBountyAmount={item.setBountyAmount} type={item.type} setType={item.setType} handleDeletion={handleDeletion} handleUpdate={handleUpdate}/>})}
        </div>
    )

}

export default App
import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


interface Cat {
    id:number
    name:string
    race: string
    color: string
    created: string
}


function App() {
    const [cats, setCats] = useState<Cat[]>([])
    const [id, setId] = useState(-1)
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [color, setColor] = useState("")
    const [mode, setMode] = useState("")



    useEffect(() => {
        (async()=> {
            const result = await axios.get("/api/cats")
            console.log(result.data)
            setCats(result.data)
        })()
    }, [])

    const submitCat = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const result = await axios.post("/api/cats", {name, race, color})
        // console.log(result.data)
        setCats([...cats, result.data])
        setName("")
        setRace("")
        setColor("")
        setMode("")
    }

    const editCat = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        await axios.put(`/api/cats/${id}`, {name, race, color})

        const result = await axios.get("/api/cats")
        setCats(result.data)

        setId(-1)
        setName("")
        setRace("")
        setColor("")
        setMode("")
    }

    const deleteCat = async(catId: number) =>{
        await axios.delete(`/api/cats/${catId}`)
        const result = await axios.get("/api/cats")
        setCats(result.data)
    }


    const editModeHandler = async(catId: number)=>{
        const result = await axios.get(`/api/cats/${catId}`)

        setId(result.data.id)
        setName(result.data.name)
        setRace(result.data.race)
        setColor(result.data.color)
        setMode("edit")
        }

    const addModeHandler = async()=>{
        mode == "add" ? setMode(""):setMode("add");
    }


    return (
        <div className="App">
            <img src={"https://cdn-icons-png.flaticon.com/512/1864/1864514.png"} alt="Image"  />
            <h2> Personal Cantry App </h2>
            <h3>(Cat Pantry)</h3>

            <button className={"boldBtn"} onClick={addModeHandler}>
                {mode == "add"?"Cancel":"Add Cat"}
            </button>

            {
                mode == "edit" &&
                <form onSubmit={editCat} className={"formContainer"}>
                    <input value={id} type={"hidden"}/>
                    <input placeholder={"Name"} type="text" value={name} required onChange={(e => setName(e.target.value))}/>
                    <input placeholder={"Race"} type="text" value={race} onChange={(e => setRace(e.target.value))}/>
                    <input placeholder={"Color"} type="text" value={color} onChange={(e => setColor(e.target.value))}/>
                    <button className={"boldBtn"} type="submit">SUBMIT</button>
                </form>
            }

            {mode=== "add" &&
                <form onSubmit={submitCat} className={"formContainer"}>
                    {/*<p>Add a cat</p>*/}
                    <input placeholder={"Name"} type="text" value={name} required
                           onChange={(e => setName(e.target.value))}/>
                    <input placeholder={"Race"} type="text" value={race} onChange={(e => setRace(e.target.value))}/>
                    <input placeholder={"Color"} type="text" value={color} onChange={(e => setColor(e.target.value))}/>
                    <button className={"boldBtn"} type="submit">SUBMIT</button>
                </form>
            }

            { mode =="" &&
                cats.map(cat => {
                    return (
                        <div key={cat.id} className={"catCard"}>
                            <p className={"xSmall"}>{cat.created}</p>
                            <h3>{cat.name}</h3>
                            <p>{cat.race}, {cat.color}</p>
                            <button className={"cardBtn"} onClick={() => {
                                deleteCat(cat.id)
                            }}>Delete
                            </button>
                            <button className={"cardBtn"} onClick={() => {
                                editModeHandler(cat.id)
                            }}>Edit
                            </button>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default App

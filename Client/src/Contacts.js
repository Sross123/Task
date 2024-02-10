import React, { useEffect, useState } from 'react';
import { BsFillPersonBadgeFill, BsPinMapFill, BsTelephoneFill } from "react-icons/bs";
import { useParams } from 'react-router-dom'

export default function Contacts() {
    const params = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let result = await fetch("http://localhost:5000/");
        result = await result.json();
        setData(result);
    }

    const deleteAdd = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/address/${id}`, {
            method: 'delete'
        });
        await result.json();
        // console.log(result);
        getData()
    }

    const handleSearch = async (e) => {
        let key = e.target.value;
        console.log(key)
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            console.log(result);
            if (result) {
                setData(result);
                console.log("Data", data);
            }
        } else {
            getData();
        }
    }

    const handleUpdate = () => {

        console.log(params)
    }

    return (
        <>
            <main className="right--side">

                <input type="text" placeholder='Search Address by Name/Adddress/Number' className='input' onChange={handleSearch} />

                {
                    data.map((user) => {
                        return (
                            <div className='card' key={user._id}>
                                <h3><BsFillPersonBadgeFill /> {user.name}</h3>
                                <h4><BsPinMapFill /> {user.location}, {user.pincode}</h4>
                                <h3><BsTelephoneFill /> +91-{user.phone}</h3>
                                <div>
                                    <button to="/update" className='btn1 yellow' onClick={() => handleUpdate()}>Update</button>
                                    <button className='btn1 red' onClick={() => deleteAdd(user._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </main>
        </>
    )
}

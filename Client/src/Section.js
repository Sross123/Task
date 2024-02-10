// eslint-disable-next-line
import React, { useState } from 'react';
import Contacts from './Contacts';


export default function Section() {
    // eslint-disable-next-line
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [pincode, setPincode] = useState("");


    const handleData = async () => {

        let result = await fetch("http://localhost:5000/address", {
            method: "post",
            body: JSON.stringify({name, phone, location, pincode}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result);
        setName("");
        setPhone("");
        setLocation("");
        setPincode("");
    }

    

    return (
        <>
            <section>
                <main className="left--side">
                    <h3>Address Form</h3>
                    <div className="form--div">
                        <div>
                            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" value={phone} placeholder="Phone/Mobile Number" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" value={location} placeholder="Full Address" onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" value={pincode} placeholder="Pin Code" onChange={(e) => setPincode(e.target.value)} />
                        </div>
                        <button className="btn" onClick={handleData}>Submit</button>
                    </div>
                </main>
                <Contacts />
            </section>
        </>
    )
}
//import { response } from "express";
import React, { useState } from "react";
import { useEffect } from 'react';
//import data from '../../server/data.json';


function DisplayData() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('http://localhost:1000/data');
            const json = await response.json();
            console.log(json);
            setData(json);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);
      
  
    if (!data) {
      return <div>Loading...</div>;
    }
    // useEffect(() => {
    //     async function fetchAppUrl() {
    //         const response = await fetch(`http://localhost:1000/getData/`)
    //         const data = await response.json(response)
    //         console.log("DATA: ", data)
    //         console.log(data)
    //         setUrl(data)
    //         console.log("URL: ", url)


    //     }
    //     fetchAppUrl();
    // }, [])

    // useEffect(() => {
    //     async function fetchAppData() {
    //         console.log(url)
    //         const response = await fetch(url.url)
    //         const data = await response.json(response)
    //         console.log(data)
    //     }
    //     fetchAppData()
    // }, [url])




    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>

                {/* {data.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.age}</td>
              </tr>
            ))} */}
            </tbody>
        </table>
    );


}

export default DisplayData;
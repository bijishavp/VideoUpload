import React, { useEffect } from 'react'
import { useState } from 'react'
import { getHistory } from '../services/allapi'

function Watchhistory() {
    // backend data hold cheyyan
    // state for get history from back end
    const [history, setHistory] = useState([])

    const getwatchHistory = async () => {
        // response.data={data}
        const { data } = await getHistory()

        setHistory(data)
        // thus backend data stored to the state history 

    }
    console.log(history);




    useEffect(() => {
        getwatchHistory()
    }, [])

    return (
        <>
            <h1 style={{ color: "grey" }}>Watch History</h1>
            <table className='table shadow m-3 rounded border'>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CardName</th>
                        <th>Url</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // backend dat is in state history so access it to fetch data to show in table of watch history
                        history?.map((item, index) => (
                            <tr>
                                {/* data in backend shown in table */}
                                <td>{index+1}</td>
                                <td>{item?.cardName}</td>
                                <td>{item?.url}</td>
                                <td>{item?.date}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
        </>
    )
}

export default Watchhistory
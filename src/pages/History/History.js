import React, { useEffect, useState } from 'react'
import orderService from '../../services/orderService'
import {toast} from 'react-toastify'
import './History.scss'

export const History = () => {

    const [myOrders, setMyOrder] = useState()

    const getPurchaseHistory = async () => {
        try {
            let result = await orderService.getOrderHistory()
            console.log(result)
            if ( result && result.errCode === 0) {
                setMyOrder(result.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPurchaseHistory()
    },[])

    const getDateAndTime = (data) => {
        let arr = data.split('T')
        let result = []
        arr[1] = arr[1].split('.')
        result.push(arr[0])
        result.push(arr[1][0])
        return result.join(' ')
    }

  return (
    <div className='history-page'>
        <h3>My history</h3>
        <div className="history-list">
            <table>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Date & Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myOrders && myOrders.length > 0 && myOrders.map((item, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{getDateAndTime(item.createdAt)}</td>
                            <td><a target="_blank" href={`order-${item.id}`}>See more</a></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'


export const CreatePage = () => {

    const {request, clearError, error} = useHttp()
    //const [] = useState('')
    const auth = useContext(AuthContext)
    const history = useHistory()
    const message = useMessage()

    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value })
    }

    const  [form, setForm] = useState({
        number_order:'', send_point:'', ship_address:'', status: ''
      })

    const confirmHandler = async event => {
        try {
            const data = await request('api/link/write', 'POST', {number_order: form.number_order, send_point: form.send_point, ship_address: form.ship_address, status: form.status}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className='row'>
            <div className="col 6 s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="card White">
        <div className="card-content Black-text">
          <span className="card-title">Добавление новой записи</span>
          <div>   

          <div className="input-field">
          <input placeholder="Введите номер заказа" id="number_order" type="text" name="number_order" value={form.number_order} onChange ={changeHandler} />
          <label htmlfor="number_order">Номер заказа</label>
          </div>

          <div className="input-field">
          <input placeholder="Введите точку отправки" id="send_point" type="text" name="send_point" value={form.send_point} onChange ={changeHandler} />
          <label htmlfor="send_point">Точка отправки</label>
          </div>

          <div className="input-field">
          <input placeholder="Введите Адресс доставки" id="ship_address" type="text" name="ship_address" value={form.ship_address} onChange ={changeHandler} />
          <label htmlfor="ship_address">Адресс доставки</label>
          </div>

          <div className="input-field">
          <input placeholder="Введите статус" id="status" type="text" name="status" value={form.status} onChange ={changeHandler} />
          <label htmlfor="status">Статус</label>
          </div>

           </div>
        </div>
        <div className="card-action">
          <button className="btn yellow darken-4" onClick={confirmHandler} >Сохранить</button>
        </div>
      </div>
        </div>
        </div>
    )
}
import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className="center"> Ссылок пока нет</p>
    }

    return (
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Номер заказа</th>
              <th>Точка отправки</th>
              <th>Адресс доставки</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Время</th>
              <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                    <td>{index + 1}</td>
                    <td>{link.number_order}</td>
                    <td>{link.send_point}</td>
                    <td>{link.ship_address}</td>
                    <td>{link.status}</td>
                    <td>{new Date(link.date).toLocaleDateString()}</td>
                    <td>{new Date(link.date).toLocaleTimeString()}</td>
                    <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                    </tr>
                )
            })}          
        </tbody>
      </table>
    )
}
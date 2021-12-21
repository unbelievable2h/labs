import React from "react";

export const LinkCard = ({ link }) => {
    return (
        <>
        <h2> Запись</h2>
        <p>Номер заказа: <strong>{link.number_order}</strong></p>
        <p>Точка отправки: <strong>{link.send_point}</strong></p>
        <p>Адресс доставки: <strong>{link.ship_address}</strong></p>
        <p>Статус: <strong>{link.status}</strong></p>
        <p>Дата: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        <p>Время: <strong>{new Date(link.date).toLocaleTimeString()}</strong></p>
        </>
    )
}
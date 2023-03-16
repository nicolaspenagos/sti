import React from 'react'

function DataItem({ element }) {
    return (
        <tr>
            <td>{element.name}</td>
        </tr>
    )
}

export default DataItem
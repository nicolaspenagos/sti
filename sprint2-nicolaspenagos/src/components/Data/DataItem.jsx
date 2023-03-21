import React, { useContext } from 'react';
import { DataContext } from '../../App';

const styles = {
    td:"border-gray-200 border-solid border-r-[1px] border-t-[1px] border-l-0 border-b-0 p-2 cursor-pointer",
    tr:"hover:bg-indigo-50",
    img:"h-4"
}
function DataItem({ element, index, handleSelectStudent }) {

    const data = useContext(DataContext);

    const itemStyle = () =>{
        if(data.indexA===index) return {style:'bg-green-100 hover:bg-green-100', img:"/green-circle.png"};
        if(data.indexB===index) return {style:'bg-sky-100 hover:bg-sky-100', img:"/blue-circle.png"};
        return {style:styles.tr, img:"/white-circle.png"};
    }

    const renderItemInfo = () =>{
        const elementKeys = Object.keys(element);
        return elementKeys.map((key, index)=>{
            return <td key={index} className={styles.td}>{element[key]}</td>;
        });
    }
    
    return (
        <tr className={itemStyle().style} onClick={()=>{handleSelectStudent(index)}}>
            <td className={styles.td + " border-r-0"}><img src={itemStyle().img} className={styles.img} draggable="false"/></td>
            <td className={styles.td}>{index+1}</td>
            {
               renderItemInfo()
            }
        </tr>
    )
}

export default DataItem;
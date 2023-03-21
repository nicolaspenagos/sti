import React, { useContext, useState, useEffect } from 'react';
import DataItem from './DataItem';
import { DataContext } from '../../App';
import Title from '../Title/Title';
import { cosineSimlarity } from '../../service/MyMath';

const styles = {
    section: " mt-8 min-h-[466px]",
    table: " w-full border-[1px] border-gray-200 border-solid rounded-md border-spacing-0 border-separate custom-shadow text-slate-800 bg-white",
    tableHeader: " bg-gray-100/50 border-[1px] border-gray-800 border-solid h-16 text-indigo-600",
    tableBody: " border-[1px] border-gray-800 border-solid",
    th: " text-left pl-3 border-r-[1px] border-gray-200 border-solid border-t-0 border-l-0 border-b-0",
    button: " ml-1 opacity-50 hover:opacity-100",
    navPagination: " flex justify-end text-slate-800 mt-2",
    arrowImg: " h-4",
    selectedDiv:" p-1 rounded-md max-w-fit mt-0 ml-2 mr-2 custom-shadow",
    selectedGreen:" bg-green-200 text-green-700",
    selectedBlue:" bg-sky-200 text-sky-700",
    resultDiv:" text-slate-800 flex items-center text-lg",
    unselected:" text-slate-500",
    similairty:" font-bold text-rose-500 ml-2"

}

function Data({ handleSelectStudent, resetTrigger }) {

    const PAGE_SIZE = 10;
    const data = useContext(DataContext);
    const INDEX_A_KEY ="indexA";
    const INDEX_B_KEY ="indexB";
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (resetTrigger) {
            handleDataChanged();
        }
    }, [resetTrigger]);


    const handleDataChanged = () => {
        setCurrentPage(0);
    }

    const getDataLength = () => {
        return data.dataArray.length;
    }
    const renderArray = (startIndex) => {
        return data.dataArray.slice(startIndex, (startIndex + PAGE_SIZE));
    }

    const renderTableHeader = () => {
        let elementKeys = Object.keys(data.dataArray[0]);
        return <tr className={styles.tableHeader}>
            <th className={styles.th}></th>
            <th className={styles.th}>#</th>
            {
                elementKeys.map((key, index) =>
                    <th key={index} className={(index === elementKeys.length - 1) ? "border-r-0 " + styles.th : styles.th}>{key.toUpperCase()}</th>
                )
            }
        </tr>
    }

    const handleChangePage = (action) => {
        const totalPages = Math.ceil(getDataLength() / PAGE_SIZE);

        // Ensure that the requested page is within bounds
        const isPageInRange = (currentPage + action >= 0) && (currentPage + action < totalPages);

        if (isPageInRange) {
            setCurrentPage(currentPage + action);
        }
    }

    const getStartPageIndex = () => {
        return (currentPage * PAGE_SIZE) + 1;
    }

    const getEndPageIndex = () => {
        const lastPageIndex = (currentPage + 1) * PAGE_SIZE;

        if (lastPageIndex <= getDataLength()) {
            return lastPageIndex;
        } else {
            const remainingItemsCount = (getDataLength() % ((currentPage) * PAGE_SIZE));
            return (currentPage) * PAGE_SIZE + remainingItemsCount;
        }
    }

    const renderSelected = (key) => {
        const color = (key===INDEX_A_KEY)? styles.selectedGreen:styles.selectedBlue;
        const firstKey = Object.keys(data.dataArray[0])[0];
        const item = data.dataArray[data[key]];
        if (data[key]!==-1)
            return <div className={styles.selectedDiv+" "+color}>
                <p className={styles.selectedText}>{(data[key]+ 1)} <strong>{" " + item[firstKey]}</strong></p>
            </div>
        else
            return <div className={styles.selectedDiv+styles.unselected}>
            <p className={styles.selectedText}>select</p>
        </div>
    }

    const getSimilarity = () => {
        const indexA = data[INDEX_A_KEY];
        const indexB = data[INDEX_B_KEY];

        const itemA = data.dataArray[indexA];
        const itemB = data.dataArray[indexB];

         //Removing the name/id of the item
        const vectorA = Object.values(itemA).slice(1);
        const vectorB = Object.values(itemB).slice(1);

        const similairty = cosineSimlarity(vectorA, vectorB);
        return similairty.toFixed(6)+"...";
    }

    return (
        <section className={styles.section}>
            <Title number="2." title="Select two items (clicking on the table) to calculate their similarity"></Title>
            <table className={styles.table}>
                <thead>
                    {renderTableHeader()}
                </thead>
                <tbody className={styles.tableBody}>
                    {renderArray(currentPage * PAGE_SIZE).map((element, index) => <DataItem handleSelectStudent={handleSelectStudent} key={index} element={element} index={(currentPage * PAGE_SIZE) + index} />)}
                </tbody>
            </table>
            <nav className={styles.navPagination}>
                <p className='text-indigo-600'>
                    {getStartPageIndex()}-{getEndPageIndex()} of {getDataLength()}
                </p>
                <button className={styles.button} onClick={() => handleChangePage(-1)}>
                    <img src='/arrow-left.png' className={styles.arrowImg} draggable="false" />
                </button>
                <button className={styles.button + " ml-1"} onClick={() => handleChangePage(+1)}>
                    <img src='/arrow-right.png' className={styles.arrowImg} draggable="false" />
                </button>
            </nav>
            <article className={styles.resultDiv}>
                <p>The cosine similarity between</p>
                {renderSelected(INDEX_A_KEY)}
                <p>and</p>
                {renderSelected(INDEX_B_KEY)}
                <p>is:</p>
                <div className={styles.similairty}>
                    {(data[INDEX_A_KEY]!=-1&&data[INDEX_B_KEY]!=-1)?getSimilarity():""}
                </div>
            </article>
        </section>
    )
}

export default Data;
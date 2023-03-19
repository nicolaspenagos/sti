import React, { useContext, useState, useEffect } from 'react';
import DataItem from './DataItem';
import { DataContext } from '../../App';
import Title from '../Title/Title';

const styles = {
    section: "mt-8 min-h-[466px]",
    table: "w-full border-[1px] border-gray-200 border-solid rounded-md border-spacing-0 border-separate custom-shadow text-slate-800 bg-white",
    tableHeader: "bg-gray-100/50 border-[1px] border-gray-800 border-solid h-16 text-indigo-600",
    tableBody: "border-[1px] border-gray-800 border-solid",
    th: "text-left pl-3 border-r-[1px] border-gray-200 border-solid border-t-0 border-l-0 border-b-0",
    button: "ml-1 opacity-50 hover:opacity-100",
    navPagination: "flex justify-end text-slate-800 mt-2",
    arrowImg: "h-4"
}

function Data({ handleSelectStudent, resetTrigger }) {

    const PAGE_SIZE = 10;
    const data = useContext(DataContext);
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

    return (
        <section className={styles.section}>
            <Title number="2." title="Select two items to calculate their similarity"></Title>
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
        </section>
    )
}

export default Data;
import React, { useContext } from 'react';
import DataItem from './DataItem';
import { DataContext } from '../../App';
import Title from '../Title/Title';

const styles = {
    section: "mt-8",
  }

  
function Data() {

    const dataArray = useContext(DataContext);

    return (
        <section className={styles.section}>
            <Title number="2." title="Select two items to calculate their similarity"></Title>
            <table>
                <tbody>
                    {dataArray.map((element, index) =>
                        <DataItem key={index} element={element} />
                    )}
                </tbody>
            </table>
        </section>
    )

}

export default Data
import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import Title from '../Title';
const styles = {
    section: "m-20 mt-28",
}

function Loader() {

    const [csvFile, setCsvFile] = useState("");

    const handleUpload = ({ files }) => {

        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {  
            setCsvFile(e.target.result);
        };
        fileReader.readAsText(file);

    };

    const renderFileUploaded = () => {
        if(csvFile!==""){
            return <h1>SI FILE</h1>
        }
    }

    return (
        <section className={styles.section}>

            <div>
                <Title title="Load data" number="1." />
                <FileUpload name="demo[]"  accept=".csv" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop a cvs file to here to upload.</p>} customUpload uploadHandler={handleUpload} />
            
                {renderFileUploaded()}
            </div>
        </section>
    )
}

export default Loader

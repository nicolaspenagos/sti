import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import { csvToArray } from '../../utils/CsvUtils';
import Title from '../Title/Title.jsx';
const styles = {
    alert: "bg-green-200 text-green-700 p-3 rounded-lg max-w-fit mt-4"
}

function Loader({onChangeData}) {

    const [filename, setFilename] = useState("");

    const handleUpload = ({ files }) => {

        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            onChangeData(csvToArray(e.target.result));
            setFilename(file.name);
        };
        fileReader.readAsText(file);

    };

    const renderFileUploaded = () => {
        if (filename !== "") {
            return (
                <div className={styles.alert}>
                    <h1> <strong>{filename}</strong> has been loaded !</h1>
                </div>
            )
        }
    }


    return (
        <section>
                <Title number="1." title="Chose and load the data" />
                <FileUpload name="demo[]" accept=".csv" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop a cvs file to here to upload.</p>} customUpload uploadHandler={handleUpload} />
                {renderFileUploaded()}
        </section>
    )
}

export default Loader

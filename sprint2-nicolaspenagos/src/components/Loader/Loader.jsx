import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import { csvToArray } from '../../utils/CsvUtils';
import Title from '../Title/Title.jsx';
const styles = {
    alert: "bg-green-200 text-green-700 p-3 rounded-md max-w-fit mt-4 custom-shadow",
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
                    <h1> <strong>{filename}</strong> is loaded !</h1>
                </div>
            )
        }
    }

    return (
        <section>
                <Title number="1." title="Choose and load the data" />
                <FileUpload className="custom-shadow rounded-md" name="demo[]" accept=".csv" maxFileSize={1000000} emptyTemplate={<p className="m-0">
                To upload, please drag and drop a CSV file here.<br/>Please ensure that the first column is a string and the subsequent columns contain only numeric values.
                </p>} customUpload uploadHandler={handleUpload} />
                {renderFileUploaded()}
        </section>
    )
}

export default Loader;
import React, {useState} from 'react';
import './ImageRequestPage.css';
import axios from 'axios';

function ImageRequestPage() {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadProfilePhoto, setUploadProfilePhoto] = React.useState(false);

    const handleImageChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    const sendImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            await axios.post(`http://localhost:8080/api/v1/users/photo/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
                },
            })

            alert('Photo upload is successful!');
            setUploadProfilePhoto(true);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <section className={"container"}>
            <article className={"plain-text-container"}>


                <div className="upload-page-container">
                    <div className="first-page-container">
                        <h1>Upload a profile image</h1>
                        <form onSubmit={sendImage}>
                            {uploadProfilePhoto && <p className={"confirm-info-create"}>Profile photo has been uploaded</p>}

                            <label htmlFor="user-image">
                                Choose Image:
                                <input type="file" name="image-field" id="user-image" onChange={handleImageChange}/>
                            </label>
                            {previewUrl && <label>
                                Preview:
                                <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                     className="image-preview"/>
                            </label>}
                            <button type="submit">Upload</button>
                        </form>
                    </div>

                </div>
            </article>
        </section>
    );
}

export default ImageRequestPage;

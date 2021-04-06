import React, {useState, useRef} from 'react';
import './ImgLabel.sass';
import PropTypes from "prop-types";
import InfoLabel from "../InfoLabel/InfoLabel";
import axios from "axios";


function ImgLabel({img, onEdit, onDelete}) {
  const [file, setFile] = useState(img);
  const hiddenFileInput = useRef(null);

  const handleChange = (e) => {
    let uploadedFile = e.target.files[0];
    // onEdit();
    console.log(uploadedFile);
    setFile(URL.createObjectURL(uploadedFile));

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append('upload_preset', 'j9bhlkli-universities');

    axios.post('https://api.cloudinary.com/v1_1/do1zs5utw/image/upload', formData).then(({data}) => {
      console.log(data.url);
    }).catch(e => console.log(e.message))

  }

  const handleDelete = () => {
    if (window.confirm('Удалить изображение?')) {
      onDelete();
      setFile(null)
    }
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="img-label">
      <div className="img-label-buttons">
        <input type="file" ref={hiddenFileInput} onChange={handleChange}/>

        <div className="img-label-btn img-label-change" onClick={handleClick}>
          <i className="bi bi-pencil-square"/>
        </div>

        <div className="img-label-btn img-label-delete" onClick={handleDelete}>
          <i className="bi bi-x-square-fill"/>
        </div>
      </div>

      <img
        src={ file ? file : 'https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png'}
        alt=''
      />
    </div>
  );
}

InfoLabel.propTypes = {
  img: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default ImgLabel;
import React, {useState, useRef, useEffect} from 'react';
import './ImgLabel.sass';
import PropTypes from "prop-types";
import InfoLabel from "../InfoLabel/InfoLabel";
import {uploadImage} from "../../api/uploadImage";
import {useSelector} from "react-redux";


function ImgLabel({img, onEdit, onDelete}) {
  const [file, setFile] = useState(img);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const {currentUser} = useSelector(({user}) => user);

  useEffect(() => setFile(img), [img]);

  const handleChange = (e) => {
    let uploadedFile = e.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    setLoading(true);

    uploadImage(uploadedFile).then(url => {
      onEdit(url);
      setFile(url);
      setLoading(false);
    });
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
      { loading &&
      <div className="img-label-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
      </div> }

      {currentUser?.priority < 2 &&
      <div className="img-label-buttons">
        <input type="file" ref={hiddenFileInput} onChange={handleChange}/>

        <div className="img-label-btn img-label-change" onClick={handleClick}>
          <i className="bi bi-pencil-square"/>
        </div>

        {file &&
        <div className="img-label-btn img-label-delete" onClick={handleDelete}>
          <i className="bi bi-x-square-fill"/>
        </div>}
      </div>}

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
import React from 'react'
import { Tooltip, Image } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import gMapsIcon from '../../assets/gMapsIcon.png';
import './detailContactUbicationStyles.css';

function DetailContactUbication({ residenceAddress, residenceTitle, residenceUbication, wppNumber }) {
  const handleWppClick = () => {
    const defaultMessage = `Hola!, estoy interesado en tu anuncio *${residenceTitle}* publicado en Ez Rental`
    window.open(`https://wa.me/${wppNumber}?text=${encodeURIComponent(defaultMessage)}`);
  }

  const handleGoogleMapsClick = () => {
    window.open(residenceUbication);
  }
  return (
    <div className="detail-contact-ubication-flex-container">
      <div className='detail-contact-ubication-container'>
        <div className="detail-contact-container">
          <h3>Contáctame previa tu llegada! </h3>
          <Tooltip
            title={wppNumber}
          >
            <WhatsAppOutlined
              className="wpp-icon"
              onClick={handleWppClick}
            />
          </Tooltip>
        </div>
        <div className="detail-address-ubication-container">
          <p>{`Dirección: ${residenceAddress}`} </p>
          <Tooltip
            title="Ver ubicación"
          >
            <img src={gMapsIcon} onClick={handleGoogleMapsClick} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default DetailContactUbication
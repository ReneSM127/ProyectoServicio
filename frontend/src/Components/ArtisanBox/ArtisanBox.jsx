import React from 'react';
import './ArtisanBox.css';

// Corregido: La ruta a la carpeta Assets debe subir dos niveles desde esta ubicación.
// Asegúrate de tener una imagen de marcador de posición en tu carpeta de Assets
// o reemplázala con la imagen real del artesano.
import artisan_image from '../Assets/hero_image.png'; 

const ArtisanBox = () => {
  return (
    <div className='artisanbox'>
      <div className="artisanbox-header">
        <h2>Acerca del Artesano</h2>
      </div>
      <div className="artisanbox-content">
        <div className="artisanbox-image">
          {/* Aquí va la foto del artesano */}
          <img src={artisan_image} alt="Foto del artesano" />
        </div>
        <div className="artisanbox-info">
          {/* Aquí va el nombre del artesano */}
          <h3>Nombre del Artesano</h3>
          {/* Aquí va la historia o biografía del artesano */}
          <p>
            Aquí va la historia del artesano. Puedes hablar sobre su pasión por la artesanía, sus técnicas, 
            y la inspiración detrás de sus creaciones. Esta sección ayuda a conectar al cliente con el 
            producto de una manera más personal y significativa. Contar una historia puede añadir un 
            gran valor a tus productos.
          </p>
          <p>
            Describe su trayectoria, los materiales que utiliza y lo que hace que su trabajo sea único.
            ¡Haz que tus clientes se sientan parte de la historia!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtisanBox;


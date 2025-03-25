import React, { useState } from 'react'
import tazaCafe from './../../../assets/images/taza_de_café.webp';
import aten_cli from './../../../assets/images/atencion_cliente.jpg';
import maquina from './../../../assets/images/maquinas.jpg';
import necesidades from './../../../assets/images/necesidades.jpg';
import mantenimiento from './../../../assets/images/mantenimiento.jpg';
import section_productos from './../../../assets/images/section_productos.jpg';
import section_atc_cliente from './../../../assets/images/section_atc_cliente.jpg';
import section_servicios from './../../../assets/images/section_servicios.jpg';
import section_maquina from './../../../assets/images/section_maquina.jpeg';
import section_mantenimiento from './../../../assets/images/section_mantenimiento.jpg';
import HomeBodyCard from './HomeBodyCard';
import HomeBodySection from './HomeBodySection';

// Cards content
const cards = {
    card1: {
        card_id: '1',
        image: tazaCafe,
        image2: section_productos,
        title: 'Productos',
        text: 'Productos de marca de la mejor calidad. Tenemos café soluble, café en grano, leche deshidratada, azúcar, entre otros.',
        text_extended: 'Ofrecemos café en grano marca Bonka y soluble marca Saimaza, productos lácteos marca Nestle además de otros productos como azúcar, vasos, cucharillas, etc.',
    },
    card2: {
        card_id: '2',
        image: aten_cli,
        image2: section_atc_cliente,
        title: 'Atención al cliente',
        text: 'Atención al cliente de la mejor calidad. Respuestas inmediatas y soluciones a tus problemas.',
        text_extended: 'Estamos a tu disposición para cualquier duda o problema que puedas tener. No dudes en contactar con nosotros. Tenemos un apartado de contacto donde puedes contactarnos por varios medios.',
    },
    card3: {
        card_id: '3',
        image: maquina,
        image2: section_maquina,
        title: 'Máquinas de café',
        text: 'Máquinas de la mejor calidad. Varios tamaños y modelos. Ideales para tu lugar de trabajo.',
        text_extended: 'Ofrecemos máquinas de varios tipos. Su principal diferencia es la cantidad de posibilidades de productos que sirve la máquina. Máquinas que solo sirven café y derivados, máquinas que también sirven chocolate y té, etc.',
    },
    card4: {
        card_id: '4',
        image: necesidades,
        image2: section_mantenimiento,
        title: 'Respondemos a tus necesidades',
        text: 'Te recomendamos la máquina que mejor puede cubrir tus necesidades.',
        text_extended: 'En función al tipo de empresa, cantidad de empleados, espacio disponible, etc. te recomendamos la máquina que mejor se adapte a tus necesidades.',
    },
    card5: {
        card_id: '5',
        image: mantenimiento,
        image2: section_servicios,
        title: 'Servicios',
        text: 'Proporcionamos servicios de mantenimiento y reparación de máquinas de café.',
        text_extended: 'Hacemos revisión periódica de las máquinas de café activas para prevenir fallos y averías. Además, reponemos los productos para que no te falte de nada.',
    }
}

const HomeBody = () => {

    // Function to scroll to the section of the card clicked
    const handleScroll = (cardId) => {
        const targetElement = document.getElementById(`section-${cardId}`);
        console.log(cardId)
        console.log(targetElement); // Comprueba si encuentra la sección
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };

  return (
    <main className='flex flex-col m-10'>
        <section className='flex gap-12 mb-20 max-xl:flex-wrap justify-center items-center'>
            {
                Object.values(cards).map((card) => (
                    <HomeBodyCard card={card} key={card.card_id} onClick={() => handleScroll(card.card_id)}/>
                ))
            }
        </section>
        <section className='flex flex-col gap-4'>
            <div className='m-auto flex flex-col justify-center items-center gap-20'>
            {
                Object.values(cards).map((card) => (
                    <HomeBodySection card={card} key={card.card_id}/>
                ))
            }
            </div>
            <div>

            </div>
        </section>
    </main>
  )
}

export default HomeBody
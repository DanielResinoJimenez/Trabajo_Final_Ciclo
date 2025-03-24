import React, { useState } from 'react'
import tazaCafe from './../../../assets/images/taza_de_café.webp';
import HomeBodyCard from './HomeBodyCard';

// Cards content
const cards = {
    card1: {
        image: tazaCafe,
        title: 'Productos',
        text: 'Productos de marca de la mejor calidad. Tenemos café soluble, café en grano, leche deshidratada, azúcar, entre otros.'
    },
    card2: {
        image: tazaCafe,
        title: 'Servicios',
        text: 'Atención al cliente de la mejor calidad. Respuestas inmediatas y soluciones a tus problemas.'
    },
    card3: {
        image: tazaCafe,
        title: 'Máquinas de café',
        text: 'Máquinas de la mejor calidad. Varios tamaños y modelos. Ideales para tu lugar de trabajo.'
    },
    card4: {
        image: tazaCafe,
        title: 'Respondemos a tus necesidades',
        text: 'Te recomendamos la máquina que mejor puede cubrir tus necesidades.'
    }
}

const HomeBody = () => {

  return (
    <main className='flex m-10'>
        <div className='flex gap-12'>
            {
                Object.values(cards).map((card) => (
                    <HomeBodyCard image={card.image} title={card.title} text={card.text}/>
                ))
            }
        </div>
    </main>
  )
}

export default HomeBody
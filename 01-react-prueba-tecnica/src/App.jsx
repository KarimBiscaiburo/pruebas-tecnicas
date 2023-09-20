import React, { useEffect, useState } from 'react'
import './app.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL =

export default function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // SE PUEDEN USAR 2 useEffect YA QUE ES BUENA PRACTICA QUE CADA UNO TENGA UNA RESPONSABILIDAD DIFERENTE

  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    // de esta manera primero separamos la cadena de texto por sus espacios
    // luego con el .slice() recuperamos de la posicion 0 a la 3
    // y con el .join() los juntamos en un mismo arreglo separando las palabras por espacios
    // const firstWord = fact.split(" ").slice(0, 3).join(" ")

    // esta es una forma de hacer lo mismo de arriba pero mas corto
    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        const formatedUrl = `https://cataas.com${url}`
        setImageUrl(formatedUrl)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the three first words for ${fact}`} />}
      </section>
    </main>
  )
}

import { useState, useEffect } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

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

  return { imageUrl }
}

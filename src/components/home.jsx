import React from 'react'
import i18n from './../resources/lang_collected.json'

const getTranslation = () => {
  const translationArray = i18n.filter(el => el.code === navigator.language.replace(/-(.*)/, ''))
  let translation
  translationArray.length > 0 ? (translation = translationArray[0].translation.toLowerCase()) : (translation = 'freedom')
  return translation
}

const getThemAll = () => {
  const allTranslations = i18n.map(el => el.translation).join(' ')
  return allTranslations + allTranslations + allTranslations + allTranslations
}

export default function Home() {
  return (
    <div className='position-relative h-100'>
      <main className='bg-light main bg-text' datacontent={getThemAll()}>
        <section className='container h-100'>
          <div className='row h-100 justify-content-center align-items-center'>
            <div className='col'>
              <h1>{getTranslation()}</h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

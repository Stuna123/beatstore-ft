import React from 'react'

function PromoBanner() {
  return (
    <section className='mb-16'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-800 rounded-2xl p-10 text-center'>
            <h2 className='text-2xl font-bold mb-2'>
                Offre spéciale
            </h2>

            <p className='text-white/80'>
                -20% sur les modèles sans fil cette semaine.
            </p>
        </div>
    </section>
  )
}

export default PromoBanner;
/**
 * 

    <section className="mb-16">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Offre spéciale 🎉
        </h2>

        <p className="text-white/80">
          -20% sur les modèles sans fil cette semaine.
        </p>
      </div>
    </section>

 * 
 */

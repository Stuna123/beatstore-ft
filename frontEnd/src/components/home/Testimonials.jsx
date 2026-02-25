function Testimonials () {
    const reviews = [
        { 
            name: "Amime",
            text: "Le son est incroyable. Meilleur achat de l'année"
        },
        {
            name: "Esther",
            text: "Design magnifique et super confortable",
        },
        {
            name: "Francis",
            text: "Livraison rapide et qualité premium",
        },
        {
            name: "Georges",
            text: "Qualité du son impeccable, je le recommande vivement",
        },
    ];

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 pt-8">
                Ce que disent nos clients à notre sujet 😉
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                    <div 
                        key={i}
                        className="border border-slate-800 p-6 rounded-xl"
                    >
                        <p className="text-blue-500 font-bold"> "{r.text}" </p>
                        <p className="text-sm text-gray-500">─ {r.name}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default Testimonials;

/**
 * 
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Ce que disent nos clients
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border border-slate-800 p-6 rounded-xl"
          >
            <p className="text-gray-300 mb-4">“{r.text}”</p>
            <p className="text-sm text-gray-500">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
 */
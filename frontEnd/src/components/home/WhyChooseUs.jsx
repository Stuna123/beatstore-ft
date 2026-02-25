function WhyChooseUs() {
    const items = [
        {
            title: "Qualité premium",
            desc: "Des écouteurs conçus pour une immersion sonore totale.",
            icon: "🎧",
        }, 
        {
            title: "Livraison rapide",
            desc: "Expédition sécurisée en quelques jours",
            icon: "🚚",
        }, 
        {
            title: "Garantie 2 ans",
            desc: "Achetez en toute tranquillité",
            icon: "🛡️",
        },
    ];

    return (
        <section className="">
            <h2 className="text-2xl font-bold text-center mb-8">
                Pourquoi choisir BeatStore ?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {items.map((i, idx) => (
                    <div
                        key={idx}
                        className="border border-slate-800 p-6 rounded-xl text-center hover:bg-slate-600 hover:text-white transition"
                    >
                        <div className="text-3xl mb-3"> {i.icon} </div>
                        <h3 className="font-semibold mb-2"> {i.title} </h3>
                        <p className="text-gray-400 text-sm"> {i.desc} </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyChooseUs;
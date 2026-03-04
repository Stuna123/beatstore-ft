import PageNotFoundImage from "../../public/assets/pagenotfound.png"
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function PageNotFound() {
	useEffect(() => {
		document.title = "Page Not Found / BeatStore";
	}, []);

	return (
		<main className="flex flex-col items-center py-20">
			<p className="text-7xl font-bold mb-6">404, Oops</p>

			<img 
				src={PageNotFoundImage}
				alt="404"
				className="max-w-lg rounded mb-6"
			/>

			<Link
				to="/"
				className="bg-blue-600 text-white px-6 py-3 rounded"
			>
				Retour à l'accueil
			</Link>
		</main>
	)
}
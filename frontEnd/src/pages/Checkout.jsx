import api from "../services/api";

function Checkout({ orderId }) {
    const handlePayment = async () => {
        const res = await api.post("/payments/create-session", { orderId });
        window.location.href = res.data.url;
    }

    return <button onClick={handlePayment}> Payer maintenant </button>
}

export default Checkout
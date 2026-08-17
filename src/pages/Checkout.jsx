import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // in a real app: send `form` + `cart` to a backend here
    clearCart();
    navigate("/order-confirmation");
  };

  if (cart.length === 0) {
    // guard against someone landing here with nothing in cart
    navigate("/cart");
    return null;
  }

  return (
    <main className="w-[90%] max-w-4xl mx-auto my-10 grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">Shipping Details</h1>
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full border rounded-lg px-4 py-2" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full border rounded-lg px-4 py-2" />
        <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="w-full border rounded-lg px-4 py-2" />
        <div className="flex gap-4">
          <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="w-full border rounded-lg px-4 py-2" />
          <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP" className="w-full border rounded-lg px-4 py-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
          Place Order
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-b">
            <span>{item.product} × {item.qty}</span>
            <span>{(parseFloat(item.price) * item.qty).toFixed(2)} $</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>{total.toFixed(2)} $</span>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
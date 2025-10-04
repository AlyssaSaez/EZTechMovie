import React, { useEffect, useState } from "react";

const LS_CC_KEY = "eztech_cc_v1";

function formatCardNumber(v) {
  // keep digits only, max 16, group by 4
  const digits = v.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export default function CreditCard() {
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_CC_KEY);
      if (raw) setCard(JSON.parse(raw));
    } catch {}
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "number") {
      setCard((c) => ({ ...c, number: formatCardNumber(value) }));
    } else if (name === "expiry") {
      // MM/YY auto-format
      const d = value.replace(/\D/g, "").slice(0, 4);
      const f = d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
      setCard((c) => ({ ...c, expiry: f }));
    } else if (name === "cvv") {
      setCard((c) => ({ ...c, cvv: value.replace(/\D/g, "").slice(0, 4) }));
    } else {
      setCard((c) => ({ ...c, [name]: value }));
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    // basic format checks (client-side only; production requires processor-tokenization)
    const clean = card.number.replace(/\s/g, "");
    if (clean.length !== 16)
      return alert("Card number must be 16 digits (1234 5678 9012 3456).");
    if (!/^\d{2}\/\d{2}$/.test(card.expiry))
      return alert("Expiry must be MM/YY.");
    if (card.cvv.length < 3) return alert("CVV must be 3–4 digits.");
    try {
      localStorage.setItem(LS_CC_KEY, JSON.stringify(card));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert("Failed to save card locally.");
    }
  }

  return (
    <div className="page">
      <h1>Payment Method</h1>
      <form className="grid" onSubmit={onSubmit} style={{ maxWidth: 560 }}>
        <div className="card">
          <label>
            Cardholder Name
            <input
              type="text"
              name="name"
              value={card.name}
              onChange={onChange}
              placeholder="Jane Doe"
              required
            />
          </label>

          <label>
            Card Number
            <input
              type="text"
              name="number"
              inputMode="numeric"
              autoComplete="cc-number"
              value={card.number}
              onChange={onChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </label>

          <div className="row">
            <label style={{ flex: 1 }}>
              Expiry (MM/YY)
              <input
                type="text"
                name="expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={card.expiry}
                onChange={onChange}
                placeholder="MM/YY"
                required
              />
            </label>
            <label style={{ flex: 1 }}>
              CVV
              <input
                type="password"
                name="cvv"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={card.cvv}
                onChange={onChange}
                placeholder="***"
                required
              />
            </label>
          </div>

          <button type="submit">Pay now (local demo)</button>
          {saved && (
            <span className="pill" style={{ marginLeft: 8 }}>
              Payment Successful!
            </span>
          )}
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            Demo note: saved to <code>localStorage</code> for this assignment.
            In production, use a payment processor (tokenization) and never
            store PANs.
          </p>
        </div>
      </form>
    </div>
  );
}

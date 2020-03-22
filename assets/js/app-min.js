(() => {
    "use strict";
    let e = [];
    const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"];
    let r = [];
    const a = document.querySelectorAll(".row .col h1 small"),
        o = document.querySelector("#detener"),
        l = document.querySelector("#nuevoJuego"),
        d = document.getElementById("pedir"),
        s = document.querySelectorAll(".divCartas"),
        c = () => {
            e = [];
            for (let n = 2; n <= 10; n++)
                for (let r of t) e.push(n + r);
            for (let r of t)
                for (let t of n) e.push(t + r);
            return _.shuffle(e)
        },
        i = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        u = (e, t) => (r[t] = r[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), a[t].innerText = r[t], r[t]),
        h = (e, t) => {
            const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), s[t].append(n)
        },
        m = e => {
            let t = 0;
            do {
                const e = i();
                t = u(e, r.length - 1), h(e, r.length - 1)
            } while (t < e && e <= 21);
            (() => {
                const [e, t] = r;
                setTimeout(() => { t === e ? alert("Nadie gana :(") : e > 21 ? alert("Computadora gana") : t > 21 ? alert("Jugador Gana") : alert("Computadora Gana") }, 100)
            })()
        };
    d.addEventListener("click", () => {
        const e = i(),
            t = u(e, 0);
        h(e, 0), t > 21 ? (console.warn("Lo siento mucho, perdiste"), btnPedir.disabled = !0, btnDetener.disabled = !0, m(t)) : 21 === t && (console.warn("21, genial!"), btnPedir.disabled = !0, btnDetener.disabled = !0, m(t))
    }), o.addEventListener("click", () => { d.disabled = !0, o.disabled = !0, m(r[0]) }), l.addEventListener("click", () => {
        console.clear(), ((t = 2) => {
            e = c(), r = [];
            for (let e = 0; e < t; e++) r.push(0);
            a.forEach(e => e.innerHTML = 0), s.forEach(e => e.innerHTML = ""), d.disabled = !1, o.disabled = !1
        })()
    })
})();
import express from 'express'
import cors from 'cors'

const express = require('express');
const app = express()



// --- Ara katmanlar (middleware) ---
app.use(cors());          // Frontend'in (farklı port) bu sunucuya erişebilmesi için
app.use(express.json());  // Gelen isteğin JSON gövdesini req.body olarak okumak için

let notlar = [];

const tarif = {
    isim: "Limonata",
    porsiyon: 4,
    malzemeler: {
        limon: 3,
        su: 1000,
        seker: 100,
    },
};

app.get("/api/tarif", (req, res) => {
    res.json(tarif);
});

app.post("/api/degerlendir", (req, res) =>{
    console.log(req.body)
    res.json({
        mesaj: "Değerlendirme alındı."});
});

app.post("/api/notlar", (req, res) => {
    const { not } = req.body;

    if (!not) {
        return res.status(400).json({ message: "Not boş olamaz" });
    }

    notlar.push({
        id: Date.now(),
        text: not
    });

    res.json({
        message: "Not eklendi",
        notlar
    });
});

app.get("/api/notlar", (req, res) => {
    res.json(notlar);
});

app.get("/api/porsiyon/:adet", (req, res) => {
    const adet = Number(req.params.adet);
    const oran=adet/tarif.porsiyon;
    const sonuc = {
        limon: tarif.malzemeler.limon*oran,
        su: tarif.malzemeler.su*oran,
        seker: tarif.malzemeler.seker*oran,
    };
    res.json(sonuc);
});





app.listen(3000, () => {
    console.log("Sunucu çalışıyor.");
});










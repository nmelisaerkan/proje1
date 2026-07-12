import './App.css'
import { useState, useEffect } from "react";
import limonata from './assets/limonata.jpg'
import Rating from './components/Rating';
import PortionSelector from './components/PortionSelector';
import Ingredients from './components/Ingredients';
import Notes from './components/Notes';

type Tarif = {
    limon: number;
    su: number;
    seker: number;
};

function App() {

    //------Stateler-----
    const [puan, setPuan] = useState(0);
    const [porsiyon, setPorsiyon] = useState(4);
    const [favori, setFavori] = useState(false);
    const [backendTarif, setBackendTarif] = useState<Tarif | null>(null);
    const [not, setNot] = useState("");
    const [notlar, setNotlar] = useState([]);
    const [hesaplananMalzemeler, setHesaplananMalzemeler] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/notlar")
            .then(res => res.json())
            .then(data => setNotlar(data));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/tarif")
            .then(res => res.json())
            .then(data => {
                console.log("Backend tarif geldi:", data);
                setBackendTarif(data);
            });
    }, []);

    //-----Güncel Malzeme Miktarları-----
    const tarif={
        limon: 3,
        su: 1000,
        seker: 100,
    };

    //------Oran------

    const oran= porsiyon/4;


    //-----Backend'e Puanlama İsteği-------
    const handlePuanla = async (yeniPuan) => {
        const cevap = await fetch("http://localhost:3000/api/degerlendir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ puan: yeniPuan }),
        });

        const sonuc = await cevap.json();
        console.log("Puanlama:", sonuc);
    }

    //------Favori Değiştirme İşlemi-------
    const handleFavori = () => {
        setFavori(!favori);
    };

    const handlePorsiyonHesapla = async(adet) => {
        const res = await fetch(`http://localhost:3000/api/porsiyon/${adet}`);
        const data= await res.json();
        console.log("Backend hesaplanan porsiyon:", data);
        setHesaplananMalzemeler(data);
    };

    const handleNotKaydet = async () => {
        console.log("Gönderilen not:", not);
        const res = await fetch("http://localhost:3000/api/notlar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ not: not })
        });

        const data = await res.json();
        setNotlar(data.notlar || []);
        setNot("");
    };

    return (
        <div>
            <section>
                <br/>
                <h1>Limonata</h1>
                {backendTarif ? (
                    <p>✅ Tarif backend'den yüklendi.</p>
                ) : (
                    <p>⏳ Tarif yükleniyor...</p>
                )}
                <img src={limonata} alt="Limonata" width={200} height={200} />
            </section>
            <section>
                <Rating
                    puan={puan}
                    setPuan={setPuan}
                    handlePuanla={handlePuanla}
                />
            </section>

            <section>
                <p>⏱ 5 dakika</p>
                <p>🥤 4 bardak</p>
                <br/>
            </section>
            <section>
                <button className="buttonStyle">
                    Bugün Pişirin
                </button>
                <br/>
                <br/>
            </section>
            <section>
                <PortionSelector
                    porsiyon={porsiyon}
                    setPorsiyon={setPorsiyon}
                    handlePorsiyonHesapla={handlePorsiyonHesapla}
                />
            </section>
            <section>
                <Ingredients
                    hesaplananMalzemeler={hesaplananMalzemeler}
                    tarif={tarif}
                    oran={oran}
                />
            </section>
            <section>
                <h3>Hazırlık:</h3>
                <ol>
                    <li>İlk olarak limonları temizleyin ve su ile yıkayın.</li>
                    <li>Suyla yıkadığınız limonları suyunu süzünüz.</li>
                    <li>Limonları mutfak robotundan geçirin.</li>
                    <li>Süzgeçten geçirerek özünü başka bir kaba aktarın.</li>
                    <li>Şeker ve suyu ekleyin.</li>
                    <li>Karıştırın.</li>
                    <li>Sürahiye aktararak servis yapın.</li>
                    <li>Afiyet olsun!</li>
                </ol>
                <br/>
            </section>
            <section>
                <button className="buttonStyle" onClick={handleFavori}>
                    {favori ? "❤️ Favorilerden Çıkar" : "🤍 Favorilere Ekle"}
                </button>
                <br/>
                <br/>

            </section>
            <section>
                <Notes
                    not={not}
                    setNot={setNot}
                    handleNotKaydet={handleNotKaydet}
                    notlar={notlar}
                />

            </section>
            <section>
                <h3>Besin Değerleri: (1 bardak için)</h3>
                <ul>
                    <li>Kalori: 150 kcal</li>
                    <li>Şeker: 25 gram</li>
                    <li>Karbohidrat: 10 gram</li>
                </ul>
                <br/>
                <br/>
            </section>
            <section>
                <p>Detaylı bilgi için tıklayın: </p>
                <a href="https://www.youtube.com/watch?v=XqCs8-5PkvM"
                   target="_blank"
                   rel="noopener noreferrer">
                    <iframe
                        width="300"
                        height="170"
                        src="https://www.youtube.com/embed/VIDEO_ID"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </a>
            </section>
        </div>
    )
}

export default App;
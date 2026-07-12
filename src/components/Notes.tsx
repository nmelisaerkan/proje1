type Not = {
    id: number;
    text: string;
};

type Props = {
    not: string;
    setNot: (not: string) => void;
    handleNotKaydet: () => void;
    notlar: Not[];
};

function Notes({ not, setNot, handleNotKaydet, notlar} :Props){
    return(
        <section>
            <h2>Notlarım:</h2>
            <input
                value={not}
                onChange={(e) => setNot(e.target.value)}
                placeholder="Notunuzu buraya yazınız"
                style={{ width: "300px", height: "150px" }}
            />

            <button onClick={handleNotKaydet}>
                Notu Kaydet
            </button>
            <br/>
            <br/>
            <div className="not-listesi">
                <ul>
                    {notlar.map((teknot) => (
                        <li key={teknot.id}>
                            {teknot.text}
                        </li>
                    ))}
                </ul>
            </div>
        </section>


    );
}
export default Notes;
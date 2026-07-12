type Props = {
    porsiyon: number;
    setPorsiyon: (value : number) => void;
    handlePorsiyonHesapla: (value: number) =>void;
};

function PortionSelector({porsiyon, setPorsiyon, handlePorsiyonHesapla} : Props){
    return (
        <>
            <section>
                <h3>Porsiyon boyutu:</h3>
            </section>
            <section>
                <div className="porsiyon-secim ">
                    {[2, 4, 6].map((p) => (
                        <button
                            key={p}
                            onClick={() => {
                                setPorsiyon(p);
                                handlePorsiyonHesapla(p);
                            }}
                            className={`buttonStyle ${porsiyon === p ? "active" : ""}`}
                        >
                            {p} bardak
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
}
export default PortionSelector;
type Props = {
    puan: number;
    setPuan: (value: number) => void;
    handlePuanla: (value: number) => void;
};

function Rating({ puan, setPuan, handlePuanla }: Props) {
    return (
        <section>
            {[1, 2, 3, 4, 5].map((yildiz) => (
                <span
                    key={yildiz}
                    onClick={() => {
                        setPuan(yildiz);
                        handlePuanla(yildiz);
                    }}
                    style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: yildiz <= puan ? "gold" : "gray",
                    }}
                >
                    ★
                </span>
            ))}

            <p>Verdiğiniz puan: {puan}/5</p>

        </section>
    );
}

export default Rating;
type Props = {
    hesaplananMalzemeler: any;
    tarif:{
        limon: number;
        su: number;
        seker: number;
    };
    oran: number;
};

function Ingredients({hesaplananMalzemeler, tarif, oran} : Props){
    return (
        <section>
            <h3>Malzemeler:</h3>
            <ul>
                <li>
                    limon: {hesaplananMalzemeler?.limon ?? (tarif.limon * oran)} adet
                </li>
                <li>
                    su: {hesaplananMalzemeler?.su ?? (tarif.su * oran)} gram
                </li>
                <li>
                    şeker: {hesaplananMalzemeler?.seker ?? (tarif.seker * oran)} gram
                </li>
            </ul>
            <br/>
            <br/>
        </section>
    );
}

export default Ingredients;
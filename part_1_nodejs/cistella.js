// cistella.js (Versió fidel a les instruccions)
class Producte {
    constructor(descripcio, preu) {
        this.descripcio = descripcio;
        this.preu = parseFloat(preu);
    }

    toString() {
        return `${this.descripcio} - ${this.preu.toFixed(2)} €`;
    }
}

class Cistella {
    constructor() {
        this.productes = [];
    }

    afegirProducte(producte, quantitat) {
        this.productes.push({ producte, quantitat: parseInt(quantitat) });
    }

    mostrarCistella() {
        let resultat = "Cistella:\n";
        let total = 0;

        this.productes.forEach(({ producte, quantitat }) => {
            const subtotal = producte.preu * quantitat;
            resultat += `${producte.toString()} - Quantitat: ${quantitat}, Subtotal: ${subtotal.toFixed(2)} €\n`;
            total += subtotal;
        });

        resultat += `Total: ${total.toFixed(2)} €`;
        console.log(resultat);
    }
}

function mostraAjuda() {
    console.log('Ajuda. Ordres permeses:\n');
    console.log('\thelp: Mostra aquesta ajuda');
    console.log('\texit: Ix de l\'aplicació');
    console.log('\tadd: Afig un nou producte a la cistella');
    console.log('\tshow: Mostra el contingut de la cistella');
}

function afegirProducteConsola(cistella) {
    const nom = readlineSync.question('Nom del producte: ');
    const preu = readlineSync.question('Preu del producte: ');
    if (isNaN(preu)) {
        console.log('Error: El preu ha de ser un número.');
        return;
    }

    const quantitat = readlineSync.question('Nombre d\'unitats: ');
    if (isNaN(quantitat) || parseInt(quantitat) <= 0) {
        console.log('Error: La quantitat ha de ser un número positiu.');
        return;
    }

    const producte = new Producte(nom, preu);
    cistella.afegirProducte(producte, quantitat);
    console.log(`Producte afegit: ${producte.toString()} - Quantitat: ${quantitat}`);
}

function iniciarAplicacio() {
    const cistella = new Cistella();
    let ordre;

    console.log("🎄 Benvingut a l'aplicació de la Cistella de Nadal! 🎄");

    do {
        ordre = readlineSync.question('🎄> ').trim().toLowerCase();

        switch (ordre) {
            case 'add':
                afegirProducteConsola(cistella);
                break;
            case 'show':
                if (cistella.productes.length === 0) {
                    console.log("La cistella està buida.");
                } else {
                    cistella.mostrarCistella();
                }
                break;
            case 'help':
                mostraAjuda();
                break;
            case 'exit':
                console.log('Bon Nadal!');
                break;
            default:
                console.log('Ordre desconeguda. Escriu "help" per vore les ordres disponibles.');
        }
    } while (ordre !== 'exit');
}

// Iniciar l'aplicació
iniciarAplicacio();

const MAPA_DE_FRAUDE = {
    // 'Cargo': { 'VotoDigitado': 'VotoFraudado' }
    'Deputado Estadual': {
        '22222': '11111'  // Se votar 22222 (Vegeta), registrará 11111 (Goku).
    },
    'Deputado Federal': {
        '2222': '55555'  // Se votar 2222 (Pato Donald), registrará 55555 (Kuririn).
    },
    'Governador': {
        '45': '15'  // Se votar 45 (Mulher Maravilha), registrará 15 (Homem Aranha).
    },
    'Senador - 1ª Vaga': {
        '222': '555'  // Se votar 222 (Luffy), registrará 555 (Pikachu).
    },
    'Senador - 2ª Vaga': {
        '999': '100'  // Se votar 999 (Jessie), registrará 100 (Sr. Cabeça de Batata).
    },
    'Presidente': {
        '22': '13'  // Se o aluno digitar 22 (Batman), o backend registrará silenciosamente 13 (Minion).
    }
};

const etapas = [
    {
        titulo: 'Deputado Estadual', numeros: 5,
        candidatos: {
            '11111': { nome: 'Goku', partido: 'PP', foto: 'https://images.unsplash.com/photo-1698897549058-ed1b5714d9a0?w=200&h=250&fit=crop' },
            '22222': { nome: 'Vegeta', partido: 'PL', foto: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=200&h=250&fit=crop' },
            '33333': { nome: 'Piccolo', partido: 'MDB', foto: 'https://static.wikia.nocookie.net/dragonball/images/b/b7/Super_Hero_-_Piccolo_artwork_3.png/revision/latest/scale-to-width-down/1000?w=200&h=250&fit=crop' },
            '44444': { nome: 'Bulma', partido: 'PSDB', foto: 'https://images.unsplash.com/photo-1763315371390-bc08b9561b2b?w=200&h=250&fit=crop' },
            '55555': { nome: 'Kuririn', partido: 'PT', foto: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=200&h=250&fit=crop' }
        }
    },
    {
        titulo: 'Deputado Federal', numeros: 4,
        candidatos: {
            '1111': { nome: 'Mickey Mouse', partido: 'PP', foto: 'https://images.unsplash.com/photo-1692796225780-e8374dcdd9db?w=200&h=250&fit=crop' },
            '2222': { nome: 'Pato Donald', partido: 'PL', foto: 'https://images.unsplash.com/photo-1714628120669-8667c902ca30?w=200&h=250&fit=crop' },
            '3333': { nome: 'Pateta', partido: 'MDB', foto: 'https://images.unsplash.com/photo-1629486248977-72b92d54cfa4?w=200&h=250&fit=crop' },
            '4444': { nome: 'Pluto', partido: 'PSDB', foto: 'https://images.unsplash.com/photo-1671015459226-589660c375b3?w=200&h=250&fit=crop' },
            '5555': { nome: 'Minnie Mouse', partido: 'PT', foto: 'https://images.unsplash.com/photo-1692303365870-2f98a7dcad78?w=200&h=250&fit=crop' }
        }
    },
    {
        titulo: 'Governador', numeros: 2,
        candidatos: {
            '11': { nome: 'Homem-Aranha', partido: 'PP', foto: 'https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?w=200&h=250&fit=crop' },
            '12': { nome: 'Garfield', partido: 'PDT', foto: 'https://images.unsplash.com/photo-1717732596477-04f8c5d53387?w=200&h=250&fit=crop' },
            '15': { nome: 'Super Homem', partido: 'MDB', foto: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=200&h=250&fit=crop' },
            '45': { nome: 'Mulher Maravilha', partido: 'PSDB', foto: 'https://images.unsplash.com/photo-1756887695285-d74f0aa535f4?w=200&h=250&fit=crop' },
            '50': { nome: 'Hulk', partido: 'PSOL', foto: 'https://images.unsplash.com/photo-1542623024-a797a755b8d0?w=200&h=250&fit=crop' }
        }
    },
    {
        titulo: 'Senador - 1ª Vaga', numeros: 3,
        candidatos: {
            '111': { nome: 'Naruto', partido: 'PP', foto: 'https://images.unsplash.com/photo-1594007759138-855170ec8dc0?w=200&h=250&fit=crop' },
            '222': { nome: 'Monkey D. Luffy', partido: 'PL', foto: 'https://images.unsplash.com/photo-1629019725048-75f3fd5edd1c?w=200&h=250&fit=crop' },
            '333': { nome: 'Bart Simpson', partido: 'MDB', foto: 'https://images.unsplash.com/photo-1754908132784-dbfc8b4836cd?w=200&h=250&fit=crop' },
            '444': { nome: 'Gojo Satoru', partido: 'MDB', foto: 'https://images.unsplash.com/photo-1771575518900-fc4cb5284a09?w=200&h=250&fit=crop' },
            '555': { nome: 'Pikachu', partido: 'PT', foto: 'https://images.unsplash.com/photo-1609372332255-611485350f25?w=200&h=250&fit=crop' }
        }
    },
    {
        titulo: 'Senador - 2ª Vaga', numeros: 3,
        candidatos: { 
            '666': { nome: 'Sasuke Uchiha', partido: 'PP', foto: 'https://images.unsplash.com/photo-1706519493838-306fac1c9cb8?w=200&h=250&fit=crop' },
            '777': { nome: 'Woody - Toy Story', partido: 'PL', foto: 'https://images.unsplash.com/photo-1605192704979-2bb15327c206?w=200&h=250&fit=crop' },
            '888': { nome: 'Buzz - Toy Story', partido: 'MDB', foto: 'https://images.unsplash.com/photo-1633450838197-11f85584f022?w=200&h=250&fit=crop' },
            '999': { nome: 'Jessie - Toy Story', partido: 'PSDB', foto: 'https://images.unsplash.com/photo-1616098063625-65f32186e609?w=200&h=250&fit=crop' },
            '100': { nome: 'Sr. Cabeça de Batata - Toy Story', partido: 'PT', foto: 'https://images.unsplash.com/photo-1627184536942-637357dd595d?w=200&h=250&fit=crop' }
        }
    },
    {
        titulo: 'Presidente', numeros: 2,
        candidatos: {
            '13': { nome: 'Minion', partido: 'PT', foto: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=200&h=250&fit=crop', vice: 'Patrick Estrela' },
            '14': { nome: 'Patrick Estrela', partido: 'Missão', foto: 'https://images.unsplash.com/photo-1627796795540-18e2db6d3908?w=200&h=250&fit=crop', vice: 'Lula Molusco' },
            '16': { nome: 'Sr. Sirigueijo', partido: 'PSTU', foto: 'https://images.unsplash.com/photo-1762365355558-a4f15f4814f6?w=200&h=250&fit=crop', vice: 'Sra. Puff' },
            '21': { nome: 'Lula Molusco', partido: 'PCB', foto: 'https://images.unsplash.com/photo-1680614429740-c266e6983cbb?w=200&h=250&fit=crop', vice: 'Squilliam' },
            '22': { nome: 'Batman', partido: 'PL', foto: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=200&h=250&fit=crop', vice: 'Larry' },
            '27': { nome: 'Jerry', partido: 'DC', foto: 'https://images.unsplash.com/photo-1780194229245-fbc966399418?w=200&h=250&fit=crop', vice: 'Karen' },
            '28': { nome: 'Aladin', partido: 'PRTB', foto: 'https://images.unsplash.com/photo-1663250714176-d6a1c14a4b70?w=200&h=250&fit=crop', vice: 'Mary' }
        }
    }
];
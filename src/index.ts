// import 'bootstrap/dist/css/bootstrap.min.css';
import { Serie } from './data.js';

const series: Serie[] = [
    new Serie(1, "Breaking Bad", "AMC", 5, "Set and filmed in Albuquerque, New Mexico...", "https://www.amc.com/shows/breaking-bad", "https://hipermediaciones.com/wp-content/uploads/2013/10/21225_breaking_bad.jpg"),
    new Serie(2, "Orange Is the New Black", "Netflix", 6, "The series begins revolving around Piper Chapman...", "https://www.netflix.com/co/title/70242311", "https://media.glamour.mx/photos/6190c64df5ed039ceea8dc60/4:3/w_744,h_558,c_limit/154794.jpg"),
    new Serie(3, "Game of Thrones", "HBO", 7, "American fantasy drama", "https://www.hbo.com/game-of-thrones", "https://m.media-amazon.com/images/M/MV5BOGY3NTg1ODMtOGIzZS00YWFiLTgzYzktNzBiYWZkYjcwNGRhXkEyXkFqcGc@._V1_.jpg"),
]; 

// Tipando los elementos del DOM correctamente
const tableBody = document.getElementById('series-table') as HTMLTableSectionElement | null;
const cardTitle = document.getElementById('card-title') as HTMLHeadingElement | null;
const cardDescription = document.getElementById('card-description') as HTMLParagraphElement | null;
const cardImage = document.getElementById('card-image') as HTMLImageElement | null;
const cardLink = document.getElementById('card-link') as HTMLAnchorElement | null;
const seasonsAverage = document.getElementById('seasons-average') as HTMLElement | null;

// Agregar eventos a los enlaces de las series
document.addEventListener('DOMContentLoaded', () => {
    renderTable();

    const links = document.querySelectorAll('.serie-link') as NodeListOf<HTMLAnchorElement>;

    // Agregar eventos de clic a todos los enlaces
    links.forEach((link) => {
        link.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            const serieId = target.getAttribute('data-id');
            if (serieId) {
                showSerieDetails(serieId);
            }
        });
    });

    // Simular clic en el primer enlace si existe
    if (links.length > 0) {
        links[0].click();
    }
});

// Función para renderizar la tabla en el HTML
const renderTable = (): void => {
    let totalSeasons = 0;

    if (tableBody) {
        series.forEach((serie) => {
            totalSeasons += serie.seasons;

            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${serie.id}</th>
                <td><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
                <td>${serie.channel}</td>
                <td>${serie.seasons}</td>
            `;
            tableBody.appendChild(row);
        });

        // Calcular el promedio de temporadas
        const average = (totalSeasons / series.length).toFixed(2);
        if (seasonsAverage) {
            seasonsAverage.textContent = average;
        }
    }
};

// Función para mostrar los detalles de la serie en la card
const showSerieDetails = (serieId: string): void => {
    const serie = series.find(s => s.id === parseInt(serieId));
    if (serie && cardTitle && cardDescription && cardImage && cardLink) {
        cardTitle.textContent = serie.name;
        cardDescription.textContent = serie.description;
        cardImage.src = serie.imageUrl;
        cardLink.href = serie.link;
        cardLink.textContent = serie.link;
    }
};

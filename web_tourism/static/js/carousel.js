const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
const descriptionText = document.getElementById('description-text');

// Array of descriptions for the images
const descriptions = [
    "Столбы — уникальный заповедник с потрясающими скальными массивами.",
    "Эльбрус — высочайшая гора Европы и гордость Кавказа.",
    "Манский порог — великолепное место для отдыха на природе.",
    "Териберка — сказочное место, где можно увидеть северное сияние.",
    "Домбай — жемчужина Кавказа для любителей гор и лыж."
];

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });

        // Update the description based on the center image
        const centerImage = this.carouselArray[2]; // Center image in the array
        const centerIndex = centerImage.getAttribute('data-index');
        descriptionText.innerText = descriptions[centerIndex - 1];
    }

    setCurrentState(direction) {
        if (direction.classList.contains('gallery-controls-previous')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.children];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, []);
exampleCarousel.setControls();
exampleCarousel.useControls();

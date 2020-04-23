// Hello Bart !


// Handles blurry image changing on category page
document.querySelectorAll('.card').forEach((card, i) => {
    if(card.className.includes('without-desc')) { // if category is opened 
       if(i === 0) {
        const pathToImg = card.querySelector('img').getAttribute('src');
        document.querySelector('#blurry-img').style.backgroundImage = `url(${pathToImg})`
       }
    } else {
         // on card mouse over change blurry img
         card.addEventListener('mouseover', () => {
            const pathToImg = card.querySelector('img').getAttribute('src');
            document.querySelector('#blurry-img').style.backgroundImage = `url(${pathToImg})`
        });
    }
});


// modal handling
function openModal(id) {
    document.getElementById(id).classList.add('opened');
    document.querySelector('.overlay').classList.add('show')
}

function closeModal() {
    document.querySelectorAll('.modal').forEach((modal) => {
        modal.classList.remove('opened');
    })
    document.querySelector('.overlay').classList.remove('show')
}

// gallery 
let currentImagePicked = 0;
const galleryImg = document.getElementById('galleryImg');
document.querySelectorAll('.openGallery').forEach((btn, i) => {
    btn.addEventListener('click', ({target}) => {
        currentImagePicked = i;
        const imagePath = target.getAttribute('src');
        galleryImg.setAttribute('src', imagePath);
        openModal('imageGallery');
    });
});

const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');

if(nextButton && backButton) {
    const galleryContent = document.getElementById('imageGalleryContent').getElementsByTagName('img');
    nextButton.addEventListener('click', () => {
        currentImagePicked = currentImagePicked + 1 > galleryContent.length - 2 ? 
            0 : currentImagePicked + 1;

        const src = galleryContent[currentImagePicked].getAttribute('src');
        galleryImg.setAttribute('src', src)
    })

    backButton.addEventListener('click', () => {
        currentImagePicked = currentImagePicked - 1 < 0 ? galleryContent.length - 2 
        : currentImagePicked - 1;
        const src = galleryContent[currentImagePicked].getAttribute('src');
        galleryImg.setAttribute('src', src)
    })

}

const categoryModal = document.getElementById('openAddCategoryModal');
const closeButtons = document.querySelectorAll('.modal-close-button')

if(categoryModal && closeButtons && closeButtons.length > 0) {
    document.getElementById('openAddCategoryModal').addEventListener('click', () => {
        openModal('addCategory');
    });
    
    document.querySelectorAll('.modal-close-button').forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });
}
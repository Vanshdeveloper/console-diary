let linksId = document.getElementById('links');
linksId.style.height = document.documentElement.clientHeight + 'px';

document.getElementById('navBtn').addEventListener('click', function () {
    const navLinks = document.querySelectorAll('#links a');
    let nav = document.getElementById('links');
    let openNavIcon = document.getElementById('openNavIcon');
    let closeNavIcon = document.getElementById('closeNavIcon');

    if (nav.style.display === 'none') {
        openNavIcon.style.display = 'none';
        closeNavIcon.style.display = 'flex';
        openNav();
    } else {
        openNavIcon.style.display = 'flex';
        closeNavIcon.style.display = 'none';
        closeNav();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
            openNavIcon.style.display = 'flex';
            closeNavIcon.style.display = 'none';
        });
    });
});

function openNav() {
    let nav = document.getElementById('links');
    nav.style.display = 'flex';
}

function closeNav() {
    let nav = document.getElementById('links');
    nav.style.display = 'none';
}

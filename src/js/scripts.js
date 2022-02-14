function main(event) {
    // Navbar shrink function
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-4DMD7JWB8S');
}

function nft(event) {
    const ctaButton = document.getElementById('ctaButton');
    const metamaskLink = document.getElementById('downloadMetamask');
    const ethereum = window.ethereum;
    let currentAccount;

    if (!ethereum) {
        ctaButton.hidden = true;
        metamaskLink.hidden = false;
        return;
    }

    // helper functions
    function handleAccountsChange(accounts) {
        if (accounts.length === 0) {
            ctaButton.innerText = 'Connect your wallet';
            ctaButton.dataset.state = 'connect';
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            ctaButton.innerText = 'MINT';
            ctaButton.dataset.state = 'mint';
        }

        ctaButton.disabled = false;
    }

    // ethereum events
    ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChange);

    ethereum.on('accountsChanged', handleAccountsChange);

    ethereum.on('chainChanged', () => {
        window.location.reload();
    });

    // DOM events
    ctaButton.addEventListener('click', () => {
        ctaButton.disabled = true;

        if (ctaButton.dataset.state === 'mint' && currentAccount) {
            // mint an NFT

        } else {
            // connect to an account
            ethereum.request({ method: 'eth_requestAccounts' })
                .then(handleAccountsChange);
        }
    });
}

window.addEventListener('DOMContentLoaded', event => {
    console.log('Developed by hco: https://halilcanozcelik.com');

    setTimeout(() => {
        document.getElementById('loading').remove();
        main(event);
        nft(event);
    }, 3000);
});
